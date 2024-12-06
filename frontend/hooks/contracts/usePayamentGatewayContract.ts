import { useWriteContract } from "wagmi";
import PaymentGateway from "@/util/constants/abis/PaymentGateway.abi";
import { Address } from "@/util/types/shared";
import { PAYMENT_GATEWAY_CONTRACT_ADDRESS } from "@/util/constants";
import { useCallback } from "react";
import { readContract } from "@wagmi/core";
import config from "@/rainbowKit.config";
import { parseEther } from "viem";

const usePayamentGatewayContract = () => {
  const {   
    data: hash,
    writeContract,
    isPending,
    isSuccess,
    error,
  } = useWriteContract();

  const createWallet = useCallback(
    async ({
      validationCount,
      validators,
    }: {
      validationCount: number;
      validators: Address[];
    }) => {
      try {
        writeContract({
          address: PAYMENT_GATEWAY_CONTRACT_ADDRESS as Address,
          abi: PaymentGateway,
          functionName: "createWallet",
          args: [validators, validationCount],
        });
      } catch (error) {
        console.log(error);
      }
    },

    []
  );

  const getWallet = async (walletAddress: Address) => {
    const result = await readContract(config as any, {
      abi: PaymentGateway,
      address: PAYMENT_GATEWAY_CONTRACT_ADDRESS as Address,
      functionName: "getWallet",
      args: [walletAddress],
    });

    return result;
  };

  const placeOrder = useCallback(
    async ({
      productName,
      productId,
      price,
      walletAddress,
      amount,
    }: {
      productName: string;
      productId: string;
      price: number;
      walletAddress: Address;
      amount: string;
    }) => {
      try {
        writeContract({
          value: parseEther(price.toString()),
          address: PAYMENT_GATEWAY_CONTRACT_ADDRESS as Address,
          abi: PaymentGateway,
          functionName: "placeOrder",
          args: [productName, productId,  (parseEther(price.toString())), walletAddress],
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return {
    createWallet,
    isPending,
    isSuccess,
    error,
    hash,
    getWallet,
    placeOrder,
  };
};

export default usePayamentGatewayContract;
