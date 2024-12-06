"use client";

import { WagmiProvider } from "wagmi";
import config from "@/rainbowKit.config";
import React from "react";

function Wagmi({ children }: { children: React.ReactNode }) {
  return <WagmiProvider  config={config}>{children}</WagmiProvider>;
} 

export default Wagmi;
