import { Router } from "express";
import User from "../models/User.js";
import Observation from "../models/Observation.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Update profile
router.patch("/profile", authenticateToken, async (req, res) => {
  try {
    const { bio, location, avatar } = req.body;
    const updates = {};
    if (bio !== undefined) updates.bio = bio;
    if (location !== undefined) updates.location = location;
    if (avatar !== undefined) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
    });
    res.json({ user: user.toPublicJSON() });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Toggle favorite
router.post("/favorites", authenticateToken, async (req, res) => {
  try {
    const { type, targetId, name } = req.body;
    const user = await User.findById(req.userId);

    const existingIdx = user.favorites.findIndex(
      (f) => f.targetId === targetId && f.type === type
    );

    if (existingIdx > -1) {
      user.favorites.splice(existingIdx, 1);
    } else {
      user.favorites.push({ type, targetId, name });
    }

    await user.save();
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get favorites
router.get("/favorites", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Log observation
router.post("/observations", authenticateToken, async (req, res) => {
  try {
    const { type, targetId, name, note, location } = req.body;
    const observation = new Observation({
      user: req.userId,
      type,
      targetId,
      name,
      note,
      location,
    });
    await observation.save();

    await User.findByIdAndUpdate(req.userId, {
      $inc: { totalObservations: 1 },
    });

    res.status(201).json({ observation });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get user observations
router.get("/observations", authenticateToken, async (req, res) => {
  try {
    const observations = await Observation.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ observations });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get user profile by username
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: user.toPublicJSON() });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
