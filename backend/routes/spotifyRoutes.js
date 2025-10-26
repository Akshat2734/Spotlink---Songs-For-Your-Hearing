import express from "express";
import { fetchTopTracks } from "../services/spotifyService.js";
// Import the other services you need
import { fetchRecommendationsWithPreview } from "../services/recommendationService.js";
import { fetchTracksAnalysis } from "../services/analysisService.js";

const router = express.Router();

router.get("/topitems", async (req, res) => {
  // Use the session-stored access token
  if (!req.session.accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // 1. Get the user's top tracks
    const topTracks = await fetchTopTracks(req.session.accessToken);
    
    // 2. Use those tracks as seeds to get recommendations
    const recommendations = await fetchRecommendationsWithPreview(topTracks);
    
    // 3. Get the audio analysis for the recommendations
    const finalData = await fetchTracksAnalysis(recommendations);
    
    // 4. Send the final, combined data back to the frontend
    res.json(finalData);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get top items and recommendations" });
  }
});

export default router;