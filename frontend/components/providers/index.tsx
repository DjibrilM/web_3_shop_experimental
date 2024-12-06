'use client';

import React from "react";
import Wagmi from "./WagmiProvider";
import RainbowProvider from "./RainbowKitProvider";
import ReactQueryProvider from "./QueryClientProvider";
import EthereumTokenStateProvider from "./EthereumTokenStateProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <EthereumTokenStateProvider>
        <Wagmi>
          <RainbowProvider>{children}</RainbowProvider>
        </Wagmi>
      </EthereumTokenStateProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
