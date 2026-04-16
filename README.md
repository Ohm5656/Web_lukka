# TechHaven Monorepo

This project now runs as a `client / server` monorepo where the React storefront is hosted by an ASP.NET Core backend in production-style mode.

## Structure

- `client/` - React + Vite frontend
- `server/` - ASP.NET Core backend

## Client

```bash
cd client
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to the ASP.NET Core backend by default.

## Server

```bash
cd server
dotnet run
```

Default local API URL:

- `http://localhost:5198`

## Hosted mode

If you want `.NET` to host the frontend and backend together from one server:

```bash
npm run build --prefix client
dotnet run --project server
```

Then open:

- `http://localhost:5198`

The server will serve the built React app from `client/dist` and route `/api/*` requests to ASP.NET Core endpoints.

## Current migration status

- React UI lives in `client/`
- ASP.NET Core API lives in `server/`
- Product, category, article, and contact info data are served from the backend
- React storefront pages read their core data from backend APIs
- Contact form posts through the backend
- ASP.NET Core can host the built frontend from `client/dist`
