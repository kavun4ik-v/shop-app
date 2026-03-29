# Test JS Full-Stack Project

This project has a backend (Node.js + Express + TypeScript + PostgreSQL) and a frontend (HTML + CSS + TypeScript).

## Project Structure

```
test-js-fullstack/
├── backend/          # Backend code
│   ├── index.ts      # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── modules/      # Database modules
├── frontend/         # Frontend code
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts    # Main frontend script
│       └── styles.css
└── package.json      # Root package.json for scripts
```

## Setup

1. Install dependencies:
   - Root: `npm install`
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`

2. Set up environment variables for database in `backend/.env` (copy from .env.example if exists).

3. Run the project:
   - Development: `npm run dev` (runs both backend and frontend concurrently)
   - Backend only: `npm run dev:backend`
   - Frontend only: `npm run dev:frontend`

Backend runs on http://localhost:3001
Frontend runs on http://localhost:3000

## Building

- `npm run build` (builds both)
- `npm run build:backend`
- `npm run build:frontend`
