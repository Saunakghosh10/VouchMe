"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { scrollSepolia } from "wagmi/chains";
import { publicConfig, enhancedConfig } from "@/utils/config";
import Navbar from "@/components/LandingPage/Navbar";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

// Helper function to safely get localStorage value during SSR
const getInitialEnhancedConfig = () => {
  // Check if we're in browser environment
  if (typeof window !== "undefined") {
    return localStorage.getItem("useEnhancedConfig") === "true";
  }
  return false;
};

export function WalletProvider({ children }: { children: ReactNode }) {
  // Initialize state with the value from localStorage directly
  const [useEnhancedConfig, setUseEnhancedConfig] = useState(() =>
    getInitialEnhancedConfig()
  );

  // Effect to handle initialization
  useEffect(() => {
    // Double-check localStorage on mount (useful for SSR)
    const savedPreference =
      localStorage.getItem("useEnhancedConfig") === "true";
    if (savedPreference !== useEnhancedConfig) {
      setUseEnhancedConfig(savedPreference);
    }
  }, [useEnhancedConfig]);

  // Toggle wallet config
  const toggleWalletConfig = () => {
    const newConfigState = !useEnhancedConfig;
    setUseEnhancedConfig(newConfigState);
    localStorage.setItem("useEnhancedConfig", newConfigState.toString());
  };

  // Always render with the current config
  const currentConfig = useEnhancedConfig ? enhancedConfig : publicConfig;

  return (
    <WagmiProvider config={currentConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={scrollSepolia}
          theme={darkTheme({
            accentColor: "hsl(var(--primary))",
            accentColorForeground: "white",
            borderRadius: "medium",
            overlayBlur: "small",
          })}
        >
          {/* Navbar with Toggle Functionality */}
          <Navbar
            toggleWalletConfig={toggleWalletConfig}
            useEnhancedConfig={useEnhancedConfig}
          />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
