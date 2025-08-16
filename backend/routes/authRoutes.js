import express from "express";
import axios from "axios";
import querystring from "querystring";
import { client_id, client_secret, redirect_uri } from "../config/spotifyConfig.js";
import generateRandomString from "../utils/generateRandomString.js";

const router = express.Router();

let accesstoken = null;

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
  const state = req.query.state || null;

  if (!state) {
    return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
  }

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

    accesstoken = response.data;
    res.redirect("/userprofile")
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get access token' });
  }
});


router.get("/userprofile", async (req, res) => {
  try{
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accesstoken.access_token,
      },
    });
    const userformatedprofile = {
      user_id : response.data.display_name,
      user_email: response.data.email,
      user_imageUrl: response.data.images[0]?.url
    }
    res.json(userformatedprofile)
  }
  catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to get access token' });
    }
  }
)

export { userformatedprofile };
export { accesstoken };
export default router;
