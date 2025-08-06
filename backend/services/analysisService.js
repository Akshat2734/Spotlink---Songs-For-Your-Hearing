import axios from "axios";

export async function fetchTracksAnalysis(tracks) {
  // If tracks is an array, process each track
  if (Array.isArray(tracks)) {
    const results = [];
    for (const track of tracks) {
      try {
        const response = await axios.get(`https://api.reccobeats.com/v1/track/${track.id}/audio-features`, {
          headers: {
            'Accept': "application/json"
          },
        });
        const features = response.data;
        track.acousticness = features.acousticness;
        track.danceability = features.danceability;
        track.energy = features.energy;
        track.instrumentalness = features.instrumentalness;
        track.liveness = features.liveness;
        track.loudness = features.loudness;
        track.speechiness = features.speechiness;
        track.tempo = features.tempo;
        track.valence = features.valence;
      } catch (error) {
        console.error(`Audio feature fetch failed for "${track.name}"`, error?.response?.data || error.message);
      }
      results.push(track);
    }
    return results;
  } else {
    // If tracks is a single object, keep old logic
    try {
      const response = await axios.get(`https://api.reccobeats.com/v1/track/${tracks.id}/audio-features`, {
        headers: {
          'Accept': "application/json"
        },
      });
      const features = response.data;
      tracks.acousticness = features.acousticness;
      tracks.danceability = features.danceability;
      tracks.energy = features.energy;
      tracks.instrumentalness = features.instrumentalness;
      tracks.liveness = features.liveness;
      tracks.loudness = features.loudness;
      tracks.speechiness = features.speechiness;
      tracks.tempo = features.tempo;
      tracks.valence = features.valence;
    } catch (error) {
      console.error(`Audio feature fetch failed for "${tracks.name}"`, error?.response?.data || error.message);
    }
    return tracks;
  }
}