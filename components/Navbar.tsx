'use client';

import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
}

export function Navbar({ isAuthenticated, userName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <span className="font-bold text-xl text-white">CineMatch Pro</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/discover" className="text-gray-300 hover:text-white transition-colors">
              Discover
            </Link>
            <Link href="/watchlist" className="text-gray-300 hover:text-white transition-colors">
              Watchlist
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                  Profile
                </Link>
                <Link href="/notifications" className="relative">
                  <span className="text-gray-300 hover:text-white transition-colors">
                    Alerts
                  </span>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    9+
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block text-gray-300 hover:text-white py-2">
              Home
            </Link>
            <Link href="/discover" className="block text-gray-300 hover:text-white py-2">
              Discover
            </Link>
            <Link href="/watchlist" className="block text-gray-300 hover:text-white py-2">
              Watchlist
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="block text-gray-300 hover:text-white py-2">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block text-gray-300 hover:text-white py-2">
                  Login
                </Link>
                <Link href="/auth/signup" className="block bg-purple-600 text-white px-4 py-2 rounded-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
