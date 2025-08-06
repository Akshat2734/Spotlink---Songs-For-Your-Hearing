import express from "express";
import { accesstoken } from "./authRoutes.js";
import { fetchTopTracks, setSpotifyResponse } from "../services/spotifyService.js";

const router = express.Router();

router.get("/topitems", async (req, res) => {
  try {
    const data = await fetchTopTracks(accesstoken.access_token);
    setSpotifyResponse(data);
    res.redirect("/recommendation");
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get top items" });
  }
});

export default router;
