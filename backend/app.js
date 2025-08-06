import express from "express";
import https from "https";
import authRoutes from "./routes/authRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import { sslOptions } from "./config/spotifyConfig.js";

const app = express();

// Mount route handlers
app.use(authRoutes);
app.use(spotifyRoutes);
app.use(recommendationRoutes);

// Start HTTPS server
https.createServer(sslOptions, app).listen(8080, () => {
  console.log("Server running at https://127.0.0.1:8080/login");
});