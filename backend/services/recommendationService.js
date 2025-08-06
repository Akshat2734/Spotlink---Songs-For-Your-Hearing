import "../config/envSetup.js"; 
import axios from "axios";
import spotifyPreviewFinder from "spotify-preview-finder";

export async function fetchRecommendationsWithPreview(seedTracks) {
  const seedIds = seedTracks.map(t => t.id);

  const response = await axios.get('https://api.reccobeats.com/v1/track/recommendation', {
    params: {
      size: 1,
      seeds: seedIds,
      popularity: 90,
    },
    paramsSerializer: params => {
      const query = new URLSearchParams();
      params.seeds.forEach(id => query.append("seeds", id));
      query.append("size", params.size);
      return query.toString();
    },
    headers: {
      Accept: "application/json",
    },
  });
  const tracks = response.data.content.map(content => ({
    id: content.id,
    name: content.trackTitle,
    spotifyId: content.href.split("/track/")[1],
  }));
  for (const track of tracks) {
    try {
      let result = await spotifyPreviewFinder(track.name, track.artistName, 1);
      console.log(result)
      track.previewUrl = result?.results?.[0]?.previewUrls?.[0] || null;
      track.spotifyUrls = result?.results?.[0]?.spotifyUrl || null;
    } catch (error) {
      console.log(`Preview lookup failed for "${track.name}"`, error.response?.data || error.message);
      track.previewUrl = null;
      track.spotifyUrls = null;
    }
  }
  return tracks;
}
