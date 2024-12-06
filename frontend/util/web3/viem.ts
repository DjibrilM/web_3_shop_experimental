import { Address, createWalletClient, custom, parseEther } from "viem";
import localChain from "@/localChain.config";

export const walletClient = createWalletClient({
  chain: localChain,
  transport: custom(window.ethereum!),
});

export const signTransaction = async (account: Address) => {
  const request = await walletClient.prepareTransactionRequest({
    account,
    to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    value: parseEther("3"),
  });

  return await walletClient.signTransaction(request as any);
};
