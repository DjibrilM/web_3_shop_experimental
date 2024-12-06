const viem = require('viem');
import localChain from './localhost.chain';

export const publicClient = viem.createPublicClient({
  chain: localChain,
  transport: viem.http(),
});

