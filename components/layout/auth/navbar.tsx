"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const AuthNavbar = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white z-50 border-b"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/logo.svg"
            alt="Bright Futures Academy"
            width={40}
            height={40}
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About Us
          </Link>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <span>Courses</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <span>Programs</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <span>Get Involved</span>
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <span>Updates</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/sign-up"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};
