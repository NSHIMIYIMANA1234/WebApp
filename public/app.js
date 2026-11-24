async function sendForm(form, endpoint) {
  const message = document.getElementById("message");
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Something went wrong.");
    message.textContent = result.message;
    message.className = "message success";
    window.location.href = "/dashboard.html";
  } catch (error) {
    message.textContent = error.message;
    message.className = "message error";
  }
}

const registerForm = document.getElementById("register-form");
if (registerForm) registerForm.addEventListener("submit", event => {
  event.preventDefault();
  sendForm(registerForm, "/api/register");
});

const loginForm = document.getElementById("login-form");
if (loginForm) loginForm.addEventListener("submit", event => {
  event.preventDefault();
  sendForm(loginForm, "/api/login");
});

const nameElement = document.getElementById("user-name");
if (nameElement) {
  fetch("/api/me")
    .then(response => {
      if (!response.ok) window.location.href = "/login.html";
      return response.json();
    })
    .then(data => { if (data.user) nameElement.textContent = data.user.name; })
    .catch(() => { window.location.href = "/login.html"; });
}

const logoutButton = document.getElementById("logout-button");
if (logoutButton) logoutButton.addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/";
});
