import { Router } from "express";
import { stars } from "../data/stars.js";
import { constellations } from "../data/constellations.js";

const router = Router();

// Get all stars (for rendering)
router.get("/", (req, res) => {
  res.json({ stars });
});

// Get all constellations
router.get("/constellations", (req, res) => {
  res.json({ constellations });
});

// Get single constellation
router.get("/constellations/:id", (req, res) => {
  const constellation = constellations.find((c) => c.id === req.params.id);
  if (!constellation) {
    return res.status(404).json({ error: "Constellation not found" });
  }
  res.json({ constellation });
});

// Search stars
router.get("/search", (req, res) => {
  const query = (req.query.q || "").toLowerCase();
  if (!query) return res.json({ results: [] });

  const starResults = stars
    .filter((s) => s.name && s.name.toLowerCase().includes(query))
    .slice(0, 20);

  const constellationResults = constellations
    .filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query)
    )
    .slice(0, 10);

  res.json({
    results: [
      ...constellationResults.map((c) => ({ type: "constellation", ...c })),
      ...starResults.map((s) => ({ type: "star", ...s })),
    ],
  });
});

export default router;
