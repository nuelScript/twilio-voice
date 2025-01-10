"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mic, Menu, X } from "lucide-react";
import Link from "next/link";

export const AuthNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white z-50 border-b"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Mic className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">VoiceAI</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/features" className="text-gray-700 hover:text-blue-600">
            Features
          </Link>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <span>Solutions</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <span>Pricing</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <Link href="/docs" className="text-gray-700 hover:text-blue-600">
            Docs
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/sign-in" className="text-gray-700 hover:text-blue-600">
            Log In
          </Link>
          <Link
            href="/sign-up"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-blue-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/features"
              className="block text-gray-700 hover:text-blue-600"
            >
              Features
            </Link>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <span>Solutions</span>
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <span>Pricing</span>
              <ChevronDown size={16} />
            </button>
            <Link
              href="/docs"
              className="block text-gray-700 hover:text-blue-600"
            >
              Docs
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="block text-gray-700 hover:text-blue-600"
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
};
