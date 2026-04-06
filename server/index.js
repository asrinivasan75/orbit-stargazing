import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import starRoutes from "./routes/stars.js";
import userRoutes from "./routes/users.js";
import socialRoutes from "./routes/social.js";
import { authenticateSocket } from "./middleware/auth.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stars", starRoutes);
app.use("/api/users", userRoutes);
app.use("/api/social", socialRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Socket.io — real-time presence
const onlineUsers = new Map();

io.use(authenticateSocket);

io.on("connection", (socket) => {
  const userId = socket.userId;
  const username = socket.username;

  onlineUsers.set(userId, {
    socketId: socket.id,
    username,
    viewing: null,
    location: null,
  });

  // Broadcast updated presence list
  io.emit("presence:update", Object.fromEntries(onlineUsers));

  socket.on("viewing:update", (data) => {
    const user = onlineUsers.get(userId);
    if (user) {
      user.viewing = data; // { ra, dec, constellation, starName }
      onlineUsers.set(userId, user);
      io.emit("presence:update", Object.fromEntries(onlineUsers));
    }
  });

  socket.on("location:update", (data) => {
    const user = onlineUsers.get(userId);
    if (user) {
      user.location = data; // { lat, lng }
      onlineUsers.set(userId, user);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("presence:update", Object.fromEntries(onlineUsers));
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/orbit")
  .then(() => {
    console.log("Connected to MongoDB");
    httpServer.listen(PORT, () => {
      console.log(`Orbit server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

export { io };
