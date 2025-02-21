import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="block bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-white text-2xl font-bold">
            VouchMe
          </Link>

          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
