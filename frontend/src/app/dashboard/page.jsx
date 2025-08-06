"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ListMusic, BarChart3, Music4, Smile, Zap, Waves, Piano, Radio, MessageSquareText, Volume2, Gauge, ChevronDown, Activity, Play, Pause } from 'lucide-react';

// --- Mock Data (Updated with all new features) ---
const topSongsData = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    coverArt: "https://placehold.co/100x100/1DB954/ffffff?text=BL",
    duration: "3:20",
    durationSeconds: 200,
    features: {
      danceability: 0.88,
      energy: 0.79,
      valence: 0.55,
      acousticness: 0.02,
      instrumentalness: 0.00009,
      liveness: 0.08,
      loudness: -5.9,
      speechiness: 0.06,
      tempo: 171.0
    }
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    coverArt: "https://placehold.co/100x100/f56a6a/ffffff?text=AIW",
    duration: "2:47",
    durationSeconds: 167,
    features: {
      danceability: 0.52,
      energy: 0.73,
      valence: 0.66,
      acousticness: 0.34,
      instrumentalness: 0.001,
      liveness: 0.31,
      loudness: -5.3,
      speechiness: 0.05,
      tempo: 174.0
    }
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    coverArt: "https://placehold.co/100x100/8d49e9/ffffff?text=L",
    duration: "3:23",
    durationSeconds: 203,
    features: {
      danceability: 0.78,
      energy: 0.85,
      valence: 0.91,
      acousticness: 0.01,
      instrumentalness: 0.0,
      liveness: 0.06,
      loudness: -3.7,
      speechiness: 0.06,
      tempo: 103.0
    }
  },
  {
    id: 4,
    title: "good 4 u",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    coverArt: "https://placehold.co/100x100/c90076/ffffff?text=G4U",
    duration: "2:58",
    durationSeconds: 178,
    features: {
      danceability: 0.59,
      energy: 0.95,
      valence: 0.68,
      acousticness: 0.33,
      instrumentalness: 0.0,
      liveness: 0.08,
      loudness: -5.0,
      speechiness: 0.15,
      tempo: 167.0
    }
  },
  {
    id: 5,
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    coverArt: "https://placehold.co/100x100/ff4632/ffffff?text=S",
    duration: "2:21",
    durationSeconds: 141,
    features: {
      danceability: 0.59,
      energy: 0.76,
      valence: 0.47,
      acousticness: 0.03,
      instrumentalness: 0.0,
      liveness: 0.10,
      loudness: -5.4,
      speechiness: 0.04,
      tempo: 170.0
    }
  },
  {
    id: 6,
    title: "Peaches",
    artist: "Justin Bieber, Daniel Caesar, Giveon",
    album: "Justice",
    coverArt: "https://placehold.co/100x100/ff8c27/ffffff?text=P",
    duration: "3:18",
    durationSeconds: 198,
    features: {
      danceability: 0.67,
      energy: 0.69,
      valence: 0.46,
      acousticness: 0.32,
      instrumentalness: 0.0,
      liveness: 0.42,
      loudness: -6.1,
      speechiness: 0.11,
      tempo: 90.0
    }
  },
  {
    id: 7,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    coverArt: "https://placehold.co/100x100/1DB954/ffffff?text=SYT",
    duration: "3:35",
    durationSeconds: 215,
    features: {
      danceability: 0.68,
      energy: 0.82,
      valence: 0.64,
      acousticness: 0.02,
      instrumentalness: 0.000009,
      liveness: 0.54,
      loudness: -4.6,
      speechiness: 0.03,
      tempo: 118.0
    }
  },
  {
    id: 8,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    coverArt: "https://placehold.co/100x100/f56a6a/ffffff?text=WS",
    duration: "2:54",
    durationSeconds: 174,
    features: {
      danceability: 0.54,
      energy: 0.81,
      valence: 0.55,
      acousticness: 0.12,
      instrumentalness: 0.0,
      liveness: 0.33,
      loudness: -4.2,
      speechiness: 0.04,
      tempo: 95.0
    }
  },
    {
    id: 9,
    title: "Shivers",
    artist: "Ed Sheeran",
    album: "=",
    coverArt: "https://placehold.co/100x100/f05549/ffffff?text=SH",
    duration: "3:27",
    durationSeconds: 207,
    features: {
      danceability: 0.78,
      energy: 0.85,
      valence: 0.82,
      acousticness: 0.28,
      instrumentalness: 0.0,
      liveness: 0.04,
      loudness: -2.8,
      speechiness: 0.08,
      tempo: 141.0
    }
  },
  {
    id: 10,
    title: "Bad Habits",
    artist: "Ed Sheeran",
    album: "=",
    coverArt: "https://placehold.co/100x100/f05549/ffffff?text=BH",
    duration: "3:51",
    durationSeconds: 231,
    features: {
      danceability: 0.80,
      energy: 0.89,
      valence: 0.59,
      acousticness: 0.04,
      instrumentalness: 0.00003,
      liveness: 0.36,
      loudness: -3.7,
      speechiness: 0.03,
      tempo: 126.0
    }
  }
];

// --- Reusable Feature Components ---

const FeatureProgressBar = ({ name, value, icon: Icon, color }) => (
  <div>
    <div className="flex justify-between items-center mb-1 text-xs text-gray-300">
      <div className="flex items-center">
        <Icon className="w-3.5 h-3.5 mr-2" />
        <span>{name}</span>
      </div>
      <span>{Math.round(value * 100)}%</span>
    </div>
    <div className="w-full bg-gray-700/50 rounded-full h-2">
      <div 
        className={`bg-gradient-to-r ${color} h-2 rounded-full`} 
        style={{ width: `${value * 100}%` }}
      ></div>
    </div>
  </div>
);

const VitalStat = ({ name, value, unit, icon: Icon }) => (
    <div className="bg-gray-800/50 p-3 rounded-lg text-center">
        <Icon className="w-5 h-5 mx-auto text-blue-400 mb-1"/>
        <p className="text-xs text-gray-400">{name}</p>
        <p className="text-lg font-bold text-white">{value} <span className="text-sm font-normal text-gray-500">{unit}</span></p>
    </div>
);

// --- New Responsive Average Stats Components ---

const statItemsConfig = (stats) => [
    { name: 'Danceability', value: `${(stats.danceability * 100).toFixed(0)}%`, icon: Music4 },
    { name: 'Energy', value: `${(stats.energy * 100).toFixed(0)}%`, icon: Zap },
    { name: 'Positivity', value: `${(stats.valence * 100).toFixed(0)}%`, icon: Smile },
    { name: 'Liveness', value: `${(stats.liveness * 100).toFixed(0)}%`, icon: Radio },
    { name: 'Acoustic', value: `${(stats.acousticness * 100).toFixed(0)}%`, icon: Waves },
    { name: 'Tempo', value: `${stats.tempo.toFixed(0)} BPM`, icon: Gauge },
];

const AverageStatsDesktop = ({ stats }) => (
    <div className="bg-gray-900/70 backdrop-blur-md p-4 rounded-xl border border-gray-800 mb-8">
        <div className="flex items-center mb-4 px-2">
            <Activity className="w-6 h-6 mr-3 text-blue-500" />
            <h2 className="text-2xl font-semibold">Your Average Vibe</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {statItemsConfig(stats).map(item => (
                <div key={item.name} className="bg-gray-800/60 p-4 rounded-lg text-center">
                    <item.icon className="w-7 h-7 mx-auto text-blue-400 mb-2"/>
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="text-sm text-gray-400">{item.name}</p>
                </div>
            ))}
        </div>
    </div>
);

const AverageVibeCardMobile = ({ stats, isExpanded, onExpand }) => (
    <div className={`relative transition-all duration-300 ${isExpanded ? 'z-10' : 'z-0'}`}>
        <div onClick={onExpand} className="flex items-center p-4 cursor-pointer bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800">
            <div className="w-16 h-16 rounded-md bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                <Activity size={32} className="text-blue-400"/>
            </div>
            <div className="ml-4 flex-grow">
                <p className="font-semibold text-lg text-white">Your Average Vibe</p>
                <p className="text-sm text-gray-400">Calculated from top tracks</p>
            </div>
            <ChevronDown className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} size={24} />
        </div>
        <div className={`absolute top-full left-0 w-full transition-all duration-300 ease-in-out origin-top ${isExpanded ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
            <div className="p-4 mt-2 bg-gray-900 rounded-xl border border-gray-700 shadow-2xl">
                <div className="grid grid-cols-3 gap-3">
                    {statItemsConfig(stats).map(item => (
                        <div key={item.name} className="bg-gray-800/60 p-2 rounded-lg text-center">
                            <item.icon className="w-5 h-5 mx-auto text-blue-400 mb-1"/>
                            <p className="text-lg font-bold text-white">{item.value}</p>
                            <p className="text-xs text-gray-400">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// --- Expandable Song Card Component ---
const SongCard = ({ song, isExpanded, onExpand, isPlaying, onPlay, opensUpward }) => {
  const featureList = [
    { name: 'Danceability', value: song.features.danceability, icon: Music4, color: 'from-pink-500 to-purple-500' },
    { name: 'Energy', value: song.features.energy, icon: Zap, color: 'from-yellow-400 to-orange-500' },
    { name: 'Positivity', value: song.features.valence, icon: Smile, color: 'from-green-400 to-teal-500' },
    { name: 'Acousticness', value: song.features.acousticness, icon: Waves, color: 'from-blue-400 to-indigo-500' },
    { name: 'Instrumental', value: song.features.instrumentalness, icon: Piano, color: 'from-gray-400 to-gray-500' },
    { name: 'Liveness', value: song.features.liveness, icon: Radio, color: 'from-red-500 to-orange-500' },
    { name: 'Speechiness', value: song.features.speechiness, icon: MessageSquareText, color: 'from-cyan-400 to-blue-400' },
  ];

  return (
    <div className={`relative transition-all duration-300 ${isExpanded ? 'z-10' : 'z-0'}`}>
      <div className="p-4 bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800">
        <div className="flex items-center">
          <div className="relative group flex-shrink-0">
            <img 
              src={song.coverArt} 
              alt={`${song.album} cover`} 
              className="w-16 h-16 rounded-md object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/1f2937/9ca3af?text=??'; }}
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPlay();
              }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isPlaying ? <Pause size={32} className="text-white"/> : <Play size={32} className="text-white"/>}
            </button>
          </div>
          <div className="ml-4 flex-grow cursor-pointer" onClick={onExpand}>
            <p className="font-semibold text-lg text-white">{song.title}</p>
            <p className="text-sm text-gray-400">{song.artist}</p>
            <div className="mt-2">
                <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                    <div 
                        key={isPlaying ? 'playing' : 'paused'}
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{
                            width: isPlaying ? '100%' : '0%',
                            transition: isPlaying ? `width ${song.durationSeconds}s linear` : 'none'
                        }}
                    ></div>
                </div>
            </div>
          </div>
          <button onClick={onExpand} className="ml-4 flex-shrink-0 self-start p-2 -mr-2">
            <ChevronDown 
              className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              size={24}
            />
          </button>
        </div>
      </div>
      
      <div 
        className={`absolute left-0 w-full transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'} ${opensUpward ? 'bottom-full origin-bottom' : 'top-full origin-top'}`}
      >
        <div className={`p-4 rounded-xl border border-gray-700 shadow-2xl bg-gray-900 ${opensUpward ? 'mb-2' : 'mt-2'}`}>
          <div className="space-y-3 mb-4">
            {featureList.map(feature => (
              <FeatureProgressBar key={feature.name} {...feature} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <VitalStat name="Tempo" value={Math.round(song.features.tempo)} unit="BPM" icon={Gauge} />
            <VitalStat name="Loudness" value={song.features.loudness.toFixed(1)} unit="dB" icon={Volume2} />
          </div>
        </div>
      </div>
    </div>
  );
};

// A custom hook to detect screen size
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Set initial state on the client
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

// --- Main Dashboard Page Component ---
export default function DashboardPage() {
  const [expandedSongId, setExpandedSongId] = useState(null);
  const [nowPlayingId, setNowPlayingId] = useState(null);
  const [isVibeCardExpanded, setIsVibeCardExpanded] = useState(false);
  
  // Use the hook to detect mobile screens (Tailwind's 'md' breakpoint is 768px)
  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleExpand = (songId) => {
    setExpandedSongId(currentId => (currentId === songId ? null : songId));
    setIsVibeCardExpanded(false); // Close vibe card when a song is clicked
  };

  const handlePlay = (songId) => {
    setNowPlayingId(currentId => (currentId === songId ? null : songId));
  };

  const handleVibeExpand = () => {
    setIsVibeCardExpanded(current => !current);
    setExpandedSongId(null); // Close any open song card
  };
  
  const averageStats = useMemo(() => {
    const totalSongs = topSongsData.length;
    if (totalSongs === 0) return {};

    const sums = topSongsData.reduce((acc, song) => {
        Object.keys(song.features).forEach(key => {
            acc[key] = (acc[key] || 0) + song.features[key];
        });
        return acc;
    }, {});

    const averages = {};
    Object.keys(sums).forEach(key => {
        averages[key] = sums[key] / totalSongs;
    });

    return averages;
  }, []);


  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col pt-24 sm:pt-28 md:pt-30">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        
        <header className="mb-6 md:mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Your Dashboard</h1>
          <p className="text-gray-400 mt-2">A look at your top 10 songs of all time.</p>
        </header>
        
        <div className="hidden md:block">
            <AverageStatsDesktop stats={averageStats} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="md:hidden">
                <AverageVibeCardMobile stats={averageStats} isExpanded={isVibeCardExpanded} onExpand={handleVibeExpand} />
            </div>
            {topSongsData.map((song, index) => {
                const isLastItem = index === topSongsData.length - 1;
                const isSingleOnLastXlRow = (topSongsData.length % 3) === 1;
                const centeringClass = (isLastItem && isSingleOnLastXlRow) ? 'xl:col-start-2' : '';
                
                // Logic for expansion direction
                const halfWayPoint = Math.ceil(topSongsData.length / 2);
                // On mobile, first half opens down, second half opens up.
                // On desktop, all cards open up.
                const opensUpward = isMobile ? index >= halfWayPoint : true;

                return (
                    <div key={song.id} className={centeringClass}>
                        <SongCard 
                          song={song}
                          isExpanded={expandedSongId === song.id}
                          onExpand={() => handleExpand(song.id)}
                          isPlaying={nowPlayingId === song.id}
                          onPlay={() => handlePlay(song.id)}
                          opensUpward={opensUpward}
                        />
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}