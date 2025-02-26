"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Image from "next/image";

//Custom Connect Button for different texts
const CustomConnectButton = ({
  useEnhancedConfig,
  isMobile = false,
}: {
  useEnhancedConfig: boolean;
  isMobile?: boolean;
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-colors w-auto md:w-full"
              >
                {useEnhancedConfig
                  ? "Connect Advanced Wallet"
                  : "Connect Local Wallet"}
              </button>
            ) : chain.unsupported ? (
              <button
                onClick={openChainModal}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
              >
                Wrong network
              </button>
            ) : (
              <div
                className={`${isMobile ? "flex-col space-y-2" : "flex gap-3"}`}
              >
                <button
                  onClick={openChainModal}
                  className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        overflow: "hidden",
                        marginRight: 4,
                      }}
                    >
                      {chain.iconUrl && (
                        <Image
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          width={16}
                          height={16}
                        />
                      )}
                    </div>
                  )}
                  {chain.name}
                </button>

                <button
                  onClick={openAccountModal}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

const Navbar = ({
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
                  ? "Use Local Wallets"
                  : "Use Advanced Wallets"}
              </button>
            )}

            {/* Custom Connect Wallet Button */}
            <CustomConnectButton useEnhancedConfig={useEnhancedConfig} />
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
                    ? "Use Local Wallets"
                    : "Use Advanced Wallets"}
                </button>
              )}

              <CustomConnectButton
                useEnhancedConfig={useEnhancedConfig}
                isMobile={true}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
