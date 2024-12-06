"use client";

import React from "react";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";

const RainbowProvider = ({ children }: { children: React.ReactNode }) => {
  return <RainbowKitProvider theme={lightTheme()}>{children}</RainbowKitProvider>;
};

export default RainbowProvider;
