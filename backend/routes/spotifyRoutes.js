import express from "express";
import { fetchTopTracks } from "../services/spotifyService.js";

const router = express.Router();

// New API endpoint for the dashboard to fetch top tracks with audio features
router.get("/api/top-tracks", async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // Note: fetchTopTracks in spotifyService will need to be updated
    // to include audio feature fetching. For now, this gets the tracks.
    const data = await fetchTopTracks(req.session.accessToken);
    res.json(data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get top items" });
  }
});


export default router;