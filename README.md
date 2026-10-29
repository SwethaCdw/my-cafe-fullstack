# My Café — Full-Stack React + Node.js Demo

A small teaching project that demonstrates a full-stack application:
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **API:** REST endpoints (`GET /api/health`, `GET /api/menu`, `POST /api/orders`)
- **Containerization:** Dockerfiles for frontend and backend, plus Docker Compose

The frontend displays the menu, fetches menu data from the backend, and lets a learner submit a demo order.

## 1. Requirements

For the local, non-Docker setup:
- Node.js 20+ (Node.js 22 recommended)
- npm

For the Docker setup:
- Docker Desktop or Docker Engine with Docker Compose

## 2. Run locally (without Docker)

Open two terminals from the project root.

### Terminal 1 — backend API

```bash
cd server
npm install
npm run dev
```

The API runs at `http://localhost:4000`.

Try:
- `http://localhost:4000/api/health`
- `http://localhost:4000/api/menu`

### Terminal 2 — React frontend

```bash
cd client
npm install
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173`.

Vite proxies `/api` requests to the backend at `http://localhost:4000`, so the browser uses the frontend origin while the dev server forwards API requests.

## 3. Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

Open `http://localhost:8080`.

The React app is built into static files and served by NGINX. NGINX forwards `/api/*` requests to the Node/Express service. The API is available to the Compose network as `http://server:4000`; `server` is the Compose service name.

Useful commands:

```bash
docker compose ps
docker compose logs -f
docker compose logs -f server
docker compose logs -f frontend
docker compose down
```

To rebuild after changing code:

```bash
docker compose up --build
```

## 4. Demo flow for a training session

1. Show `client/src/App.jsx`: React component and UI state.
2. Show `server/index.js`: Express routes and sample in-memory data.
3. Start the backend and test `/api/menu`.
4. Start React and show menu data arriving from the API.
5. Submit a demo order and inspect the API response / backend logs.
6. Explain the frontend Dockerfile (build stage + NGINX runtime).
7. Explain the backend Dockerfile (Node runtime + dependencies).
8. Run `docker compose up --build` and show both services running.
9. Show port mapping: host `8080` → frontend container `80`. The backend port `4000` is not published to the host in Compose; the frontend proxy reaches it over the internal Compose network.

## Notes

- Orders are stored in memory only, so they reset when the backend restarts. This keeps the demo simple; a real app would use a database.
- This is a learning sample, not a production-ready ordering system.
