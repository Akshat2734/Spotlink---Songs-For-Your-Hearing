"use client"

import React, { useState, useEffect } from 'react';
import { Play, Pause, ExternalLink, Share2, Music, BarChart2, Zap, Smile, Mic2, Clock, Search, TrendingUp, Sliders } from 'lucide-react';

// --- MOCK DATA & HELPERS (from previous card) ---

const mockSongData = {
    songTitle: "Blinding Lights",
    artist: "The Weeknd",
    albumName: "After Hours",
    duration: 200, // in seconds
    albumImageUrl: 'https://placehold.co/400x400/0d0d1a/e0e7ff?text=Album+Art',
    artistImageUrl: 'https://placehold.co/128x128/1f2937/9ca3af?text=Artist',
    followers: "75M",
    spotifyUrl: "#", // Placeholder link
    attributes: {
        "Danceability": 0.51,
        "Energy": 0.73,
        "Valence": 0.34,
        "Acousticness": 0.001,
        "Speechiness": 0.06,
        "Tempo": 171,
    }
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};


// --- REUSABLE & CARD-SPECIFIC COMPONENTS ---

const Feature = ({ icon, label, value, max = 1 }) => {
    const percentage = (typeof value === 'number' && max !== 0) ? (value / max) * 100 : 0;
    return (
        <div className="flex flex-col">
            <div className="flex items-center text-sm text-gray-400">
                {icon}
                <span className="ml-2">{label}</span>
            </div>
            <div className="flex items-center mt-1">
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="ml-3 text-sm font-semibold text-gray-200">{value}</span>
            </div>
        </div>
    );
};

const WaveformGraph = () => (
    <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
        <defs>
            <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(34 211 238)', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(34 211 238)', stopOpacity: 0 }} />
            </linearGradient>
        </defs>
        <path
            d="M0,40 Q15,60 30,40 T60,40 Q75,20 90,40 T120,40 Q135,50 150,40 T180,40 Q195,30 210,40 T240,40 Q255,60 270,40 T300,40"
            stroke="#22d3ee"
            fill="url(#waveformGradient)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
        />
    </svg>
);

const SpotlinkCard = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prevTime => {
                    if (prevTime + 1 >= song.duration) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, song.duration]);

    useEffect(() => {
        setCurrentTime(0);
        setIsPlaying(false);
    }, [song]);

    const progressPercentage = (currentTime / song.duration) * 100;
    const attributeIcons = {
        "Danceability": <BarChart2 size={14} />, "Energy": <Zap size={14} />, "Valence": <Smile size={14} />,
        "Acousticness": <Music size={14} />, "Speechiness": <Mic2 size={14} />, "Tempo": <Clock size={14} />,
    };

    return (
        <div className="w-full max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden bg-gray-900 grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 text-white flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                    Analyze your favorite tracks.
                </h2>
                <p className="mt-4 text-gray-400 max-w-md">
                    By leveraging insights from Spotify's audio analysis, you'll know exactly what makes a song a hit, and discover music perfectly tailored to your taste.
                </p>
                <div className="mt-8 flex items-center gap-4">
                    <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors">
                        <ExternalLink size={20} className="mr-2"/> Open in Spotify
                    </a>
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                         <Share2 size={20} className="mr-2"/> Share
                    </button>
                </div>
                 <div className="mt-12">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Key Audio Features</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                       {Object.entries(song.attributes).map(([key, value]) => (
                            <Feature key={key} label={key} value={value} icon={attributeIcons[key] || <BarChart2 size={14} />} max={key === 'Tempo' ? 250 : 1} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 sm:p-6 flex items-center justify-center">
                <div className="w-full max-w-sm bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-2xl p-6 flex flex-col text-white">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <img src={song.albumImageUrl} alt="Album" className="w-12 h-12 rounded-lg object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/1f2937/9ca3af?text=Art'; }}/>
                            <div className="ml-3">
                                <h2 className="font-bold text-lg leading-tight">{song.songTitle}</h2>
                                <p className="text-sm text-gray-400">{song.artist}</p>
                            </div>
                        </div>
                        <div className="w-8 h-8 bg-cyan-400/10 flex items-center justify-center rounded-full">
                           <Music size={16} className="text-cyan-400" />
                        </div>
                    </div>
                    <div className="h-24 my-4"><WaveformGraph /></div>
                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(song.duration)}</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2 w-full group">
                            <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${progressPercentage}%`, transition: 'width 0.2s linear' }}></div>
                        </div>
                    </div>
                    <button onClick={() => setIsPlaying(p => !p)} className="w-full mt-6 bg-cyan-500 text-black font-bold py-3 rounded-lg flex items-center justify-center hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300" aria-label={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? <Pause size={20} className="mr-2" /> : <Play size={20} className="mr-2" />}
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- PAGE SECTIONS ---

const HeroSection = () => (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 flex items-center justify-center">
        <SpotlinkCard song={mockSongData} />
    </section>
);

const FeaturesSection = () => {
    const features = [
        { icon: <Search size={24} className="text-cyan-400"/>, title: "In-Depth Analysis", description: "Get detailed audio features for any track, from danceability to acousticness." },
        { icon: <TrendingUp size={24} className="text-cyan-400"/>, title: "Track Trends", description: "See how a song's attributes compare to popular trends and chart-toppers." },
        { icon: <Sliders size={24} className="text-cyan-400"/>, title: "Personalized Discovery", description: "Find new music based on the specific audio features you love the most." }
    ];

    return (
        <section id="features" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white">Unlock the DNA of Your Music</h2>
                <p className="mt-4 text-lg text-gray-400">Spotlink goes beyond the surface to give you unparalleled insights.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map(feature => (
                        <div key={feature.title} className="bg-gray-800 p-8 rounded-2xl">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-400/10 mx-auto">
                                {feature.icon}
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                            <p className="mt-2 text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-black text-gray-400">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
                <a href="#" className="hover:text-white">About</a>
                <a href="#" className="hover:text-white">Contact</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Privacy Policy</a>
            </div>
            <p className="mt-8 text-center text-base">
                &copy; {new Date().getFullYear()} Spotlink. All rights reserved.
            </p>
        </div>
    </footer>
);


// --- MAIN HOME PAGE COMPONENT ---

const SpotlinkHomePage = () => {
    return (
        <div className="bg-gray-900 font-sans">
            <main className="bg-black">
                <HeroSection />
                <FeaturesSection />
            </main>
            <Footer />
        </div>
    );
};

export default SpotlinkHomePage;
