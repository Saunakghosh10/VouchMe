"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";


// eslint-disable-next-line react/display-name
const NavbarComponent = React.memo(({
  toggleWalletConfig,
  useEnhancedConfig,
}: {
  toggleWalletConfig: () => void;
  useEnhancedConfig: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();

  const isAuthenticated = !!address;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-white text-2xl font-bold">
            VouchMe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-300 hover:text-white transition-colors font-semibold"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="text-gray-300 hover:text-white transition-colors font-semibold"
            >
              About Us
            </button>

            {/* Only show toggle button when NOT authenticated */}
            {!isAuthenticated && (
              <button
                onClick={toggleWalletConfig}
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {useEnhancedConfig
                  ? "Disable ReOwn Wallets"
                  : "Enable ReOwn Wallets"}
              </button>
            )}

            {/* Standard RainbowKit Connect Button */}
            <ConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-3">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("footer")}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >
                About Us
              </button>

              {/* Only show toggle button when NOT authenticated (Mobile) */}
              {!isAuthenticated && (
                <button
                  onClick={toggleWalletConfig}
                  className="block w-auto text-left px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                >
                  {useEnhancedConfig
                    ? "Disable ReOwn Wallets"
                    : "Enable ReOwn Wallets"}
                </button>
              )}

              {/* Standard RainbowKit Connect Button (Mobile) */}
              <div className="py-2">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

export default NavbarComponent;
