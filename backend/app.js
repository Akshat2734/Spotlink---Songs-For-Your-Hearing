import express from "express";
import http from "http";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

dotenv.config();
const app = express();

// 1. Use CORS middleware FIRST. This is critical.
app.use(cors({
  origin: 'http://127.0.0.1:3000', // Your frontend URL
  credentials: true // This allows the browser to send cookies
}));

// 2. Use session middleware SECOND.
app.use(session({
  secret: process.env.SESSION_SECRET || 'a-very-long-and-random-secret-key', // Use a strong secret from a .env file
  resave: false,
  saveUninitialized: false, // This is a best practice.
  cookie: {
    secure: false, // Must be 'false' for HTTP
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    maxAge: 1000 * 60 * 60 // Sets cookie expiry to 1 hour
  }
}));

// 3. Mount your route handlers LAST.
app.use(authRoutes);
app.use(spotifyRoutes);
app.use(recommendationRoutes);

http.createServer(app).listen(8080, () => {
  console.log("Server running at http://127.0.0.1:8080/login");
});