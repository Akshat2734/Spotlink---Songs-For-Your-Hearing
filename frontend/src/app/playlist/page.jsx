"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

// This is your initial, pre-defined playlist data.
const initialPlaylistData = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", coverArt: "https://placehold.co/200x200/1DB954/ffffff?text=BL" },
  { id: 2, title: "As It Was", artist: "Harry Styles", coverArt: "https://placehold.co/200x200/f56a6a/ffffff?text=AIW" },
  { id: 3, title: "Levitating", artist: "Dua Lipa", coverArt: "https://placehold.co/200x200/8d49e9/ffffff?text=L" },
  { id: 4, title: "good 4 u", artist: "Olivia Rodrigo", coverArt: "https://placehold.co/200x200/c90076/ffffff?text=G4U" },
  { id: 5, title: "Stay", artist: "The Kid LAROI, Justin Bieber", coverArt: "https://placehold.co/200x200/ff4632/ffffff?text=S" },
  { id: 6, title: "Peaches", artist: "Justin Bieber, Daniel Caesar, Giveon", coverArt: "https://placehold.co/200x200/ff8c27/ffffff?text=P" },
  { id: 7, title: "Save Your Tears", artist: "The Weeknd", coverArt: "https://placehold.co/200x200/1DB954/ffffff?text=SYT" },
  { id: 8, title: "Watermelon Sugar", artist: "Harry Styles", coverArt: "https://placehold.co/200x200/f56a6a/ffffff?text=WS" },
  { id: 9, title: "Shivers", artist: "Ed Sheeran", coverArt: "https://placehold.co/200x200/f05549/ffffff?text=SH" },
  { id: 10, title: "Bad Habits", artist: "Ed Sheeran", coverArt: "https://placehold.co/200x200/f05549/ffffff?text=BH" }
];

// A new, visually appealing card component for the playlist grid.
const PlaylistCard = ({ song, onRemove }) => {
    return (
        <div className="relative group bg-gray-800/50 p-4 rounded-lg flex flex-col items-center text-center transition-all duration-300 hover:bg-gray-800/80 hover:scale-105">
            <button
                onClick={() => onRemove(song.id)}
                className="absolute top-2 right-2 p-1.5 bg-gray-900/50 rounded-full text-gray-400 opacity-50 group-hover:opacity-100 hover:text-white hover:bg-red-600/50 transition-all"
                aria-label={`Remove ${song.title}`}
            >
                <X size={16} />
            </button>
            <img
                src={song.coverArt}
                alt={song.title}
                className="w-full h-auto aspect-square rounded-md object-cover mb-4 shadow-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/1f2937/9ca3af?text=??'; }}
            />
            <p className="font-semibold text-white truncate w-full">{song.title}</p>
            <p className="text-sm text-gray-400 truncate w-full">{song.artist}</p>
        </div>
    );
};

// The main Playlist Page component
export default function PlaylistPage() {
    // State now holds a single list of songs for our playlist.
    const [songs, setSongs] = useState(initialPlaylistData);

    // This function handles the removal of a song.
    const handleRemoveSong = (songIdToRemove) => {
        // We filter the list, keeping all songs EXCEPT the one with the matching ID.
        setSongs(currentSongs => currentSongs.filter(song => song.id !== songIdToRemove));
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            {/* THIS IS THE UPDATED LINE with responsive top padding */}
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 pt-24 lg:pt-28">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">My Liked Songs</h1>
                    <p className="text-gray-400 mt-2 max-w-xl mx-auto">
                        Your collection of curated tracks. Click the 'x' on any card to remove a song.
                    </p>
                </header>

                {/* A responsive grid to display the song cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {songs.map(song => (
                        <PlaylistCard
                            key={song.id}
                            song={song}
                            onRemove={handleRemoveSong}
                        />
                    ))}
                </div>
                
                {/* A message to show if the playlist becomes empty */}
                {songs.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">Your playlist is empty.</p>
                        <p>You've removed all the songs!</p>
                    </div>
                )}
            </div>
        </div>
    );
}