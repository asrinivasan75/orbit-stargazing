# Orbit — Social Stargazing App

## 1. Solo or Pair?
I am working **solo** on this project.

## 2. Project Pitch
**Orbit** is an interactive social stargazing platform that brings the night sky to your browser. Users input their location (or allow geolocation) and are presented with a real-time, accurate 3D rendering of their night sky powered by Three.js. The experience is immersive — users can orbit, zoom, and explore the celestial sphere, tap on constellations to reveal mythology and astronomical data, and "favorite" stars and constellations to build a personal collection.

The social layer sets Orbit apart: users can see what friends are currently observing in real-time via Socket.io, share their favorite celestial objects, and discover what's visible from different locations around the world. A curated "Tonight's Sky" feed highlights visible planets, meteor showers, ISS passes, and other astronomical events based on the user's location and time.

Orbit is designed for both casual stargazers who want to identify what they see outside and astronomy enthusiasts who want a beautiful, connected way to explore the cosmos.

## 3. Tech Stack

**Frontend:**
- **React** (via Vite) — UI framework
- **Three.js / React Three Fiber** — 3D star field rendering, constellation visualization, camera controls
- **Framer Motion** — Page transitions, UI animations, scroll-driven reveals
- **React Router** — Multi-page routing

**Backend:**
- **Express.js** — REST API server
- **MongoDB + Mongoose** — User data, favorites, social connections
- **Socket.io** — Real-time presence (see what friends are viewing)
- **JWT** — Authentication via JSON Web Tokens

**Deployment:**
- Frontend deployed to **Vercel**
- Backend deployed to **Render** (or Railway)
- MongoDB hosted on **MongoDB Atlas**

## 4. Milestone Goals (by April 16th)

By the milestone check-in, I plan to have completed:

- **Backend API** fully functional: user auth (register/login), CRUD routes for favorites, friend connections, and user profiles
- **MongoDB schemas** designed and populated with star catalog data (brightest stars + 88 modern constellations)
- **Socket.io** server set up for real-time presence broadcasting
- **Three.js star field** rendering with accurate star positions from catalog data, basic camera controls (orbit, zoom)
- **Basic frontend shell** with routing between the main sky view, profile, and explore pages

The priority is backend-first with the Three.js rendering engine as the core frontend deliverable for this milestone. Full UI polish, social features, and the "Tonight's Sky" feed will come in the final push before submission.

## 5. Extra Credit Technologies

- **Three.js / React Three Fiber** — 3D rendering of the celestial sphere, constellation line drawing, interactive star selection (+10%)
- **Socket.io** — Real-time friend presence, live "viewing" status updates, shared observation sessions (+10%)

**Total anticipated extra credit: +20%**
