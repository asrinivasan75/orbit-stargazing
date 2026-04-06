import { Router } from "express";
import User from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Send friend request
router.post("/friend-request", authenticateToken, async (req, res) => {
  try {
    const { targetUsername } = req.body;
    const target = await User.findOne({ username: targetUsername });

    if (!target) return res.status(404).json({ error: "User not found" });
    if (target._id.toString() === req.userId) {
      return res.status(400).json({ error: "Cannot friend yourself" });
    }

    if (target.friends.includes(req.userId)) {
      return res.status(400).json({ error: "Already friends" });
    }

    if (target.friendRequests.includes(req.userId)) {
      return res.status(400).json({ error: "Request already sent" });
    }

    target.friendRequests.push(req.userId);
    await target.save();
    res.json({ message: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Accept friend request
router.post("/accept-friend", authenticateToken, async (req, res) => {
  try {
    const { requesterId } = req.body;
    const user = await User.findById(req.userId);

    if (!user.friendRequests.includes(requesterId)) {
      return res.status(400).json({ error: "No pending request" });
    }

    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== requesterId
    );
    user.friends.push(requesterId);
    await user.save();

    const requester = await User.findById(requesterId);
    requester.friends.push(req.userId);
    await requester.save();

    res.json({ message: "Friend request accepted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get friends list
router.get("/friends", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(
      "friends",
      "username avatar bio totalObservations"
    );
    res.json({ friends: user.friends });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get friend requests
router.get("/friend-requests", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(
      "friendRequests",
      "username avatar"
    );
    res.json({ friendRequests: user.friendRequests });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
