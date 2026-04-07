# Orbit — Social Stargazing Platform

An interactive social stargazing web app that brings the night sky to your browser. Explore thousands of accurately positioned stars, trace ancient constellations, and share the cosmos with friends in real-time.

**CIS 1962 Final Project — Spring 2026, University of Pennsylvania**

## Features

- **Interactive 3D Sky** — WebGL celestial sphere with 182 real stars, twinkling shaders, diffraction spikes, and FOV zoom (telescope effect) powered by Three.js + React Three Fiber
- **Constellation Atlas** — 30 constellations with mythology, best viewing times, hemisphere data, and visible connecting lines
- **Geolocation** — Detects your city via browser API and displays it in the sky view
- **Favorites & Observations** — Heart stars and constellations, log observations with notes
- **Friends & Real-Time Presence** — Add friends, see what they're observing live via Socket.io
- **Camera Navigation** — Click a constellation in Explore or the sidebar and the camera smoothly pans to it
- **Cinematic Landing Page** — Scroll-driven storytelling with Lenis smooth scroll, parallax, pinned word reveals, animated counters, magnetic buttons, and film grain overlay
- **Dashboard** — Personalized hub with tonight's visible constellations, stats, recent activity, and quick navigation

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router |
| 3D Rendering | Three.js, React Three Fiber, Drei |
| Animations | Framer Motion, Lenis (smooth scroll) |
| State | Zustand |
| Backend | Express.js, Node.js |
| Database | MongoDB + Mongoose |
| Real-Time | Socket.io |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Icons | Lucide React |

## Project Structure

```
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Navbar, SkyNav, StarInfoPanel, SearchOverlay
│   │   ├── hooks/           # Zustand store, Socket.io, Lenis, Geolocation
│   │   ├── pages/           # Landing, Dashboard, Sky, Explore, Friends, Profile, Auth
│   │   ├── three/           # Three.js scene, star renderer, constellation lines
│   │   ├── styles/          # Global design system
│   │   └── utils/           # API client
│   └── vercel.json          # Vercel SPA rewrites
├── server/                  # Express backend
│   ├── data/                # Star catalog (182 stars) + constellation data (30)
│   ├── models/              # User, Observation (Mongoose schemas)
│   ├── routes/              # auth, stars, users, social
│   ├── middleware/           # JWT auth (HTTP + WebSocket)
│   └── render.yaml          # Render deployment config
└── PROPOSAL.md              # Course proposal document
```

## Running Locally

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Setup

```bash
# Clone
git clone https://github.com/asrinivasan75/orbit-stargazing.git
cd orbit-stargazing

# Backend
cd server
cp .env.example .env    # Edit with your MongoDB URI and JWT secret
npm install
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
```

Open http://localhost:5173

### Environment Variables

**Server (`server/.env`):**
```
MONGODB_URI=mongodb://localhost:27017/orbit
JWT_SECRET=your-secret-key
PORT=3001
CLIENT_URL=http://localhost:5173
```

**Client (optional, for production):**
```
VITE_API_URL=https://your-backend-url.com
```

## Deployment

- **Frontend:** Vercel — auto-builds from `client/` directory
- **Backend:** Render — Web Service from `server/` directory with env vars for MongoDB Atlas URI, JWT secret, and client URL

## Extra Credit Technologies

- **Three.js / React Three Fiber** — 3D celestial sphere rendering with custom GLSL shaders (+10%)
- **Socket.io** — Real-time friend presence system (+10%)
