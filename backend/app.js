import express from "express";
import authRoutes from "./routes/authRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import http from "http"; 
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors"

const app = express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend to connect
  credentials: true // This is important for sessions/cookies
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: "none"  // Set to true if you are using HTTPS in production
}}))

// Mount route handlers
app.use(authRoutes);
app.use(spotifyRoutes);
app.use(recommendationRoutes);

// Catch-all route for unmatched requests
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

http.createServer(app).listen(8080, () => {
  console.log("Server running at http://127.0.0.1:8080/login");
});