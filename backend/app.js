import express from "express";
import authRoutes from "./routes/authRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import http from "http"; 

const app = express();

// Mount route handlers
app.use(authRoutes);
app.use(spotifyRoutes);
app.use(recommendationRoutes);

http.createServer(app).listen(8080, () => {
  console.log("Server running at http://127.0.0.1:8080/login");
});