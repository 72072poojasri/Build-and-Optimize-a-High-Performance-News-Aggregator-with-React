# High-Performance News Aggregator (React + Node)

This project is a lightweight news aggregator using the HackerNews API. It includes:

- Backend: Node + Express proxy and simple caching (port 4000)
- Frontend: Vite + React with virtualized list rendering (port 5173)
- Dockerfiles and docker-compose for local deployment

Quick start (development):

1. Install dependencies for backend and frontend:

```powershell
cd "c:/gpp tasks/Build and Optimize a High-Performance News Aggregator with React/backend"
npm install
cd "..\frontend"
npm install
```

2. Run backend and frontend in separate terminals:

Backend:

```powershell
cd "c:/gpp tasks/Build and Optimize a High-Performance News Aggregator with React/backend"
npm start
```

Frontend (dev):

```powershell
cd "c:/gpp tasks/Build and Optimize a High-Performance News Aggregator with React/frontend"
npm run dev
```

The frontend proxies `/api` to the backend during development.

Docker (production-like):

```powershell
docker-compose up --build
```

Notes & optimizations:

- The backend caches HackerNews responses for short TTL to reduce API calls.
- The frontend uses `@tanstack/react-virtual` to render large lists efficiently.
- For Lighthouse and Core Web Vitals tuning: serve built frontend via the `preview` script or a static server and run Chrome Lighthouse.
