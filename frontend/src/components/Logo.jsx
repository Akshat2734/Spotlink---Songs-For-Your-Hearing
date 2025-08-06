import React from 'react';

const Logo = () => (
  <a href="#" className="flex items-center space-x-2">
    <div className="w-8 h-8 flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <image href="SpotLink_Logo.png" x="0" y="0" width="48" height="48" />
      </svg>
    </div>
    <span className="text-xl font-bold text-white">Spotlink</span>
  </a>
);

export default Logo;
