const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = path.join(__dirname, "data", "users.json");

fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, "[]", "utf8");
}

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "change-this-secret-before-production",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax" }
}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Not logged in" });
  res.json({ user: req.session.user });
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  if (users.some(user => user.email === normalizedEmail)) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), name: name.trim(), email: normalizedEmail, passwordHash };
  users.push(user);
  saveUsers(users);

  req.session.user = { id: user.id, name: user.name, email: user.email };
  res.status(201).json({ message: "Registration successful.", user: req.session.user });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = readUsers().find(item => item.email === String(email || "").trim().toLowerCase());
  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  req.session.user = { id: user.id, name: user.name, email: user.email };
  res.json({ message: "Login successful.", user: req.session.user });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out." }));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CODERWANDA WebApp is running on http://localhost:${PORT}`);
});
