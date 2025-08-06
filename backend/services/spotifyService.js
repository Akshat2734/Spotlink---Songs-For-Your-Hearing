import axios from "axios";

let spotifyResponse = null;

export async function fetchTopTracks(token) {
  const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      time_range: "short_term",
      limit: 5,
    },
  });

  return response.data.items.map(track => ({
    id: track.id,
    name: track.name,
  }));
}

export function setSpotifyResponse(data) {
  spotifyResponse = data;
}

export function getSpotifyResponse() {
  return spotifyResponse;
}
