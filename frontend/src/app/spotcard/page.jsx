"use client";

import React from 'react';
import MusicCard from '@/components/MusicCard';

const songData = {
  artist: "Stellar Fusion",
  songTitle: "Galactic Echoes",
  albumName: "Celestial Journeys",
  followers: "1,234,567",
  progress: 75,
  duration: 245,
  attributes: {
    Acousticness: "0.12",
    Danceability: "0.78",
    Energy: "0.85",
    Instrumentalness: "0.05",
    Liveness: "0.22",
    Loudness: "-5.5 dB",
    Speechiness: "0.04",
    Valence: "0.65",
    Tempo: "124 BPM",
  },
  artistImageUrl: `https://npr.brightspotcdn.com/dims4/default/f225683/2147483647/strip/true/crop/1623x912+0+0/resize/880x494!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fimages%2Fnews%2FSFKART_COURTESYOFCITYOFSFK.jpg`,
  albumImageUrl: `https://npr.brightspotcdn.com/dims4/default/f225683/2147483647/strip/true/crop/1623x912+0+0/resize/880x494!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fimages%2Fnews%2FSFKART_COURTESYOFCITYOFSFK.jpg`,
};

export default function SongCard() {
  const handleChoice = (choice) => {
    console.log(`You chose: ${choice}`);
    // Here you would add logic to fetch the next song
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans">
      <main className="flex flex-col items-center justify-center min-h-screen pt-22 pb-12 px-4 ">
        <MusicCard song={songData} />
        <div className="flex items-center justify-center space-x-8 mt-8">
          <button
            onClick={() => handleChoice('dislike')}
            className="group flex items-center justify-center w-24 h-24 bg-gray-800 border-2 border-red-500/50 rounded-full text-red-500 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
            aria-label="Dislike"
          >
            <div className="transition-transform group-hover:rotate-12">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6L18 18M6 18L18 6" />
              </svg>
            </div>
          </button>
          <button
            onClick={() => handleChoice('like')}
            className="group flex items-center justify-center w-24 h-24 bg-gray-800 border-2 border-green-500/50 rounded-full text-green-500 hover:bg-green-500/10 hover:border-green-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
            aria-label="Like"
          >
            <div className="transition-transform group-hover:scale-125">
              {/* Corrected Heart SVG - This is the only change */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}