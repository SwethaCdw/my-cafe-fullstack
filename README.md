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