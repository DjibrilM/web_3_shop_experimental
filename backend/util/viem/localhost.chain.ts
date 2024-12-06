import { Chain } from 'viem';

// Define your local blockchain
const localChain: Chain = {
  id: 31337,
  name: 'Localhost',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545/'] },
  },
  blockExplorers: {
    default: { name: 'Local Explorer', url: '' },
  },
};

export default localChain;
