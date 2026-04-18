# Backend

Express + TypeScript API for the Abbey full-stack app.

## Run

- `npm run dev` - start API in watch mode
- `npm run build` - compile TypeScript to `dist/`
- `npm run start` - run compiled API from `dist/server.js`

## Environment

Copy `.env.example` to `.env` and set:

- `PORT` - API port
- `CORS_ORIGIN` - allowed frontend origin
- `JWT_SECRET` - secret used for JWT signing
- `DATABASE_URL` - PostgreSQL connection string for Prisma
