# Abbey Full Stack

Simple full-stack app with:
- `frontend`: React + Vite + TypeScript
- `backend`: Express + TypeScript + Prisma

## Quick Start (from repository root)

1. Install root tooling:
   - `npm install`
2. Install app dependencies:
   - `npm run install:all`
3. Create env files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
4. Start both services:
   - `npm run dev`

Frontend runs on `http://localhost:5173` and backend runs on `http://localhost:4000` by default.

## Root Scripts

- `npm run dev` - run backend and frontend together
- `npm run build` - build backend and frontend
- `npm run start` - run built backend (`backend/dist/server.js`)
- `npm run lint` - run frontend lint

## Environment Variables

### Backend (`backend/.env`)

- `PORT`: backend port (default `4000`)
- `CORS_ORIGIN`: allowed frontend origin (default `http://localhost:5173`)
- `JWT_SECRET`: secret used to sign auth tokens
- `DATABASE_URL`: PostgreSQL connection string for Prisma

### Frontend (`frontend/.env`)

- `VITE_BACKEND_URL`: backend base URL for API calls (default `http://localhost:4000`)