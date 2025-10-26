import express from "express";
import axios from "axios";
import querystring from "querystring";
import { client_id, client_secret, redirect_uri } from "../config/spotifyConfig.js";
import generateRandomString from "../utils/generateRandomString.js";

const router = express.Router();

router.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state,
      show_dialog: true
    })
  );
});

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        }
      }
    );
    // Store the token in the session
    req.session.accessToken = response.data.access_token;
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.redirect('http://127.0.0.1:3000/err');
      }
      
      // Redirect back to the frontend dashboard ONLY after the session is saved.
      console.log('Session saved successfully. Redirecting to frontend.');
      res.redirect('http://127.0.0.1:3000/'); 
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.redirect('http://127.0.0.1:3000/err');
  }
});

router.get("/userprofile", async (req, res) => {
  console.log('Backend: /userprofile hit. Session:', req.session.accessToken); // Debugging line
  
  if (!req.session.accessToken) {
    console.error('Backend: No accessToken found in session.');
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + req.session.accessToken,
      },
    });

    const userData = {
      name: response.data.display_name,
      avatarUrl: response.data.images[0]?.url
    };
    
    res.json(userData);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

export default router;