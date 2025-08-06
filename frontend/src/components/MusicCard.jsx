import React, { useState, useEffect } from 'react';
import { Play, Pause, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import Feature from './Feature';
import CircularProgress from './CircularProgress';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const MusicCard = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAttributesOpen, setIsAttributesOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          if (prevTime + 1 >= song.duration) {
            setIsPlaying(false);
            return song.duration;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, song.duration]);

  // Reset when song changes
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, [song]);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row bg-black">
        <div className="w-full md:w-2/5 bg-indigo-700/80 p-4 sm:p-6 flex flex-col items-center justify-center text-white relative backdrop-blur-sm">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${song.albumImageUrl})` }}></div>
          <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
            <CircularProgress progress={(currentTime / song.duration) * 100} size={160} strokeWidth={10} />
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg">
              <img
                src={song.albumImageUrl}
                alt="Album Art"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200/4f46e5/e0e7ff?text=Error'; }}
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-6 text-center relative z-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{song.songTitle}</h2>
            <p className="text-base sm:text-lg text-indigo-200">{song.artist}</p>
          </div>
          <button className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-indigo-200 hover:text-white transition-colors" title="Open in Spotify">
            <ExternalLink size={20} />
          </button>
        </div>
        <div className="w-full md:w-3/5 bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4 sm:mb-6">
              <img
                src={song.artistImageUrl}
                alt="Artist"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-4 shadow-md object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/1f2937/9ca3af?text=Error'; }}
              />
              <div>
                <p className="text-sm text-gray-400">Artist</p>
                <h1 className="text-xl sm:text-2xl font-bold">{song.artist}</h1>
                <p className="text-sm text-gray-400">{song.followers} Followers</p>
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <p className="text-sm text-gray-400">Album</p>
              <h3 className="text-base sm:text-lg font-semibold">{song.albumName}</h3>
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between items-center sm:hidden mb-2">
                <h4 className="font-semibold text-gray-300">Song Attributes</h4>
                <button
                  onClick={() => setIsAttributesOpen(o => !o)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  {isAttributesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              <dl className={`grid-cols-1 gap-x-8 gap-y-3 ${isAttributesOpen ? 'grid' : 'hidden'} sm:grid sm:grid-cols-2`}>
                {Object.entries(song.attributes).map(([key, value]) => (
                  <Feature key={key} label={key} value={value} />
                ))}
              </dl>
            </div>
          </div>

          <div className="w-full px-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(song.duration)}</span>
            </div>
            <div className="bg-gray-600 rounded-full h-1.5 w-full">
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: `${(currentTime / song.duration) * 100}%`,
                  transition: 'width 0.2s linear',
                  background: 'currentColor',
                  color: '#22c55e', // keep styling minimal, could elevate to tailwind class
                }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              onClick={() => setIsPlaying(p => !p)}
              className="bg-green-500 hover:bg-green-400 text-white rounded-full p-4 shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
