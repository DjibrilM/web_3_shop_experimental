
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, createConfig } from "@wagmi/core";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import localChain from './localChain.config';

const config = getDefaultConfig({
  appName: "Blockchian shop",
  projectId: "bc95d16d-c1b1-479d-bf12-9150077aa4d8",
  chains: [mainnet, polygon, optimism, arbitrum, base, localChain],
  ssr: true, // If your dApp uses server side rendering (SSR)

});

export default config;



