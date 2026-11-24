# CODERWANDA WebApp Project

A starter web application for the CODERWANDA Ltd DevOps practical. It demonstrates user registration, login, and access to a protected information dashboard.

## Requirements

- Node.js 18 or later
- npm

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## Main features

- Register with a name, email, and password
- Passwords are hashed with bcryptjs
- Log in and log out using a session
- Access a protected dashboard after login

## Project structure

```text
CODERWANDA-WebApp/
├── public/
│   ├── app.js
│   ├── dashboard.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── styles.css
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Important security note

This is an educational starter project, not a production-ready authentication system. Before production deployment, configure a strong SESSION_SECRET, HTTPS, a persistent session store, secure cookies, input validation, rate limiting, and a production database. The JSON user file is for local demonstration only.

## Git commands for Q3

Run these commands from this project directory:

```bash
git init
git add .
git commit -m "Initial commit"
git status
```
