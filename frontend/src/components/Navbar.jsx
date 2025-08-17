"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp, Music, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // Assuming you are still using the AuthContext

// --- Reusable Components (Logo, DropdownMenu, UserProfile) ---
// These components remain unchanged.
const Logo = () => (
    <Link href="/" className="flex items-center space-x-2">
        <Music size={28} className="text-blue-500"/>
        <span className="text-white text-2xl font-bold">Spotlink</span>
    </Link>
);

const DropdownMenu = ({ onLogout }) => (
  <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-700">
    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Dashboard</Link>
    <Link href="/playlist" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Playlist</Link>
    <div className="border-t border-gray-700 my-2"></div>
    <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700">
      Log out
    </button>
  </div>
);

const UserProfile = ({ user, onToggleDropdown, isOpen }) => (
  <button 
    onClick={onToggleDropdown} 
    className="flex items-center space-x-3 bg-gray-800/60 hover:bg-gray-700/80 pl-2 pr-3 py-2 rounded-full transition-colors"
  >
    <img
      src={user.avatarUrl}
      alt={`${user.name}'s avatar`}
      className="w-7 h-7 rounded-full object-cover border-2 border-gray-600"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/1f2937/9ca3af?text=??'; }}
    />
    <span className="text-white font-medium text-sm hidden sm:block">{user.name}</span>
    {isOpen ? <ChevronUp size={16} className="text-gray-400 hidden sm:block" /> : <ChevronDown size={16} className="text-gray-400 hidden sm:block" />}
  </button>
);


// --- Base navigation data ---
// We'll use this as the starting point for our links.
const baseNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'SpotCard', path: '/spotcard' }
];

// --- The Main Navbar Component (Updated) ---
const Navbar = () => {
  const { isLoggedIn, user, login, logout } = useAuth(); 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // --- NEW: Dynamically generate the links to display ---
  // We use useMemo so this list is only recalculated when the pathname changes.
  const displayLinks = useMemo(() => {
    const newLinks = [...baseNavLinks];

    if (pathname === '/dashboard') {
        newLinks.push({ name: 'Dashboard', path: '/dashboard' });
    } else if (pathname === '/playlist') {
        newLinks.push({ name: 'Playlist', path: '/playlist' });
    }
    
    return newLinks;
  }, [pathname]);
  
  // No need for a separate activeLink state, pathname is enough
  const activeLink = pathname;

  // Effect to handle clicks outside the user profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // When we log out, also close the dropdown
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <>
      <header className="bg-gray-900/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 md:flex items-center justify-between h-20">
          
          {/* Left Side: Hamburger (Mobile) & Logo (Desktop) */}
          <div className="flex items-center justify-start">
              <button 
                  className="md:hidden mr-4 text-gray-300 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
              >
                  <Menu size={28} />
              </button>
              <div className="hidden md:block">
                  <Logo />
              </div>
          </div>

          {/* Center: Logo (Mobile) & Desktop Nav */}
          <div className="flex justify-center md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="md:hidden -ml-10">
                <Logo />
            </div>
            {/* UPDATED: This nav now maps over our dynamic 'displayLinks' array */}
            <nav className="hidden md:flex items-center space-x-2 bg-gray-800/50 p-1 rounded-full">
              {displayLinks.map(link => {
                const isActive = activeLink === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Side: User Profile / Login Button */}
          <div className="flex items-center justify-end">
            {isLoggedIn && user ? (
              <div className="relative" ref={dropdownRef}>
                <UserProfile user={user} onToggleDropdown={() => setIsDropdownOpen(o => !o)} isOpen={isDropdownOpen} />
                {isDropdownOpen && <DropdownMenu onLogout={handleLogout} />}
              </div>
            ) : (
              <button 
                onClick= {login} 
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-5 rounded-full transition-colors"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Panel (Slide-out) --- */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div className={`fixed top-0 left-0 h-full w-72 bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="p-5 border-b border-gray-800 flex items-center justify-between">
           <Logo />
           <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
               <X size={28} />
           </button>
         </div>
         {/* NOTE: The mobile menu still uses the original navLinks so it doesn't show the extra buttons */}
         <nav className="p-5 flex flex-col space-y-4">
           {baseNavLinks.map(link => {
               const isActive = activeLink === link.path;
               return (
                   <Link
                       key={link.name}
                       href={link.path}
                       onClick={() => setIsMobileMenuOpen(false)}
                       className={`px-4 py-3 rounded-lg text-base font-medium ${
                           isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                       }`}
                   >
                       {link.name}
                   </Link>
               );
           })}
         </nav>
      </div>
    </>
  );
};

export default Navbar;