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

export function WalletProvider({ children }: { children: ReactNode }) {
  const [useEnhancedConfig, setUseEnhancedConfig] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    const savedPreference =
      localStorage.getItem("useEnhancedConfig") === "true";
    setUseEnhancedConfig(savedPreference);
  }, []);

  // Toggle wallet config
  const toggleWalletConfig = () => {
    const newConfigState = !useEnhancedConfig;
    setUseEnhancedConfig(newConfigState);
    localStorage.setItem("useEnhancedConfig", newConfigState.toString());
  };

  return (
    <WagmiProvider config={useEnhancedConfig ? enhancedConfig : publicConfig}>
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
          {/* ✅ Navbar with Toggle Functionality */}
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
