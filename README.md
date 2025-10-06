# Book Review API

Small Express + MongoDB API for book reviews with Swagger docs.

## Requirements
- Node.js 18+
- npm
- MongoDB (Atlas or local)
- Windows PowerShell (for commands below)

## Setup
1. Install deps:
```powershell
npm install
```

2. Create `.env` in project root (see `.env.example`) and set:
- MONGO_URI (URL-encode special characters in password)
- PORT (optional, default 4000)
- JWT_SECRET

Example `.env.example` already in repo.

## Run
- Dev (nodemon):
```powershell
npm run dev
```
- Prod:
```powershell
npm start
```
- Inline env for current session:
```powershell
$env:MONGO_URI="your_encoded_uri"; $env:PORT="4000"; npm run dev
```

## API
- Swagger UI: http://localhost:4000/api/v1/docs
- Health: GET /health
- Auth: POST /api/v1/users/register, POST /api/v1/users/login
- Books: mounted at /api/v1/books

Example PowerShell register:
```powershell
Invoke-RestMethod -Uri http://localhost:4000/api/v1/users/register -Method Post -Body (@{ name='Test'; email='test@example.com'; password='pass123' } | ConvertTo-Json) -ContentType 'application/json'
```

## Tests
Run Jest:
```powershell
npm test
```

## Git / Hackathon
- Add remote and push:
```powershell
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin HEAD
```
- Ensure `.env` is not committed (`.gitignore` includes `.env`).

## Troubleshooting
- "Cannot GET /": root redirects to docs; open `/api/v1/docs`.
- Mongo ENOTFOUND: URL-encode password (e.g. @ -> %40, # -> %23).
- If server not running, check logs, kill stuck process:
```powershell
C:\Windows\System32\netstat.exe -ano | Select-String ':4000'
# then Stop-Process -Id <PID> -Force
```

## Quick hackathon checklist
- Confirm MONGO_URI works and server shows "MongoDB connected".
- Prepare sample requests (curl/PowerShell/Postman).
- Add README, .env.example, .gitignore (done).
- Commit and push changes.
