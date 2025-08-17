import express from "express";
import axios from "axios";
import querystring from "querystring";
import { client_id, client_secret, redirect_uri } from "../config/spotifyConfig.js";
import generateRandomString from "../utils/generateRandomString.js";

const router = express.Router();

// The /login route remains the same
router.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state
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

    // Store the access token in the user's session
    req.session.data = response.data.access_token;
    console.log(req.session.data)
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.redirect('http://localhost:3000/?error=session_failed');
      }
      
      // Redirect back to the frontend dashboard ONLY after the session is saved.
      console.log('Session saved successfully. Redirecting to frontend.');
      res.redirect('http://localhost:3000/'); // Redirect to dashboard to trigger a re-fetch
    });
    
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.redirect('http://localhost:3000/?error=auth_failed');
  }
});

// An API endpoint for the frontend to get user profile data
router.get("/userprofile", async (req, res) => {
  if (!req.session.data) {
    console.log("this is the issue")
    return res.status(401).json({ error: 'Not authenticated' });
  }
  else{console.log("done")}
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + req.session.data,
      },
    });

    const userData = {
      user_id : response.data.display_name,
      user_email: response.data.email,
      user_imageUrl: response.data.images[0]?.url
    }
    res.json(userData)
    console.log(userData)
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// A route to handle logout
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