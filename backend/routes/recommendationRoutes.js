import express from "express";
import { getSpotifyResponse } from "../services/spotifyService.js";
import { fetchRecommendationsWithPreview } from "../services/recommendationService.js";
import { fetchTracksAnalysis } from "../services/analysisService.js"

const router = express.Router();

router.get("/recommendation", async (req, res) => {
  try {
    const seedTracks = getSpotifyResponse();
    const recommendations = await fetchRecommendationsWithPreview(seedTracks);
    const analysisService = await fetchTracksAnalysis(recommendations)
    res.json(analysisService);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
});

export default router;
