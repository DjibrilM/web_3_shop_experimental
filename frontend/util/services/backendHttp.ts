import axios from "axios";
import { BACKEN_BASE_URL } from "../constants";
import { Order, Product, User } from "../types/shared";
import { Address } from "viem";

const axiosHttp = axios.create({
  baseURL: BACKEN_BASE_URL,
  timeout: 10000,
});

export const createUser = async ({
  walletAddress,
}: {
  walletAddress: `0x${string}`;
}) => {
  try {
    const { data } = await axiosHttp.post<User>("users", {
      walletAddress,
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateAccount = async (walletAddress: string) => {
  try {
    const { data } = await axiosHttp.patch<User>(`users/${walletAddress}`, {
      isSeller: true,
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createProduct = async (product: Product) => {
  try {
    const { data } = await axiosHttp.post("products", product);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getSellerProducts = async (walletAddress: string) => {
  try {
    const { data } = await axiosHttp<Product[]>(
      "products/seller/" + walletAddress
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const requestKey = async () => {
  try {
    const { data } = await axiosHttp<{
      publicKey: string;
      keyIdentifier: string;
    }>("orders/request-key");
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getClientOrders = async (walletAddress: Address) => {
  try {
    const { data } = await axiosHttp<Order[]>(`orders/client/${walletAddress}`);
    return data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export const getSellerOrders = async (walletAddress: Address) => {
  try {
    const { data } = await axiosHttp<Order[]>(`orders/seller/${walletAddress}`);
    return data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

export const placeOrder = async (
  encryptedString: string,
  keyIdentifier: string
) => {
  try {
    const { data } = await axiosHttp.post<Product[]>("orders/place", {
      keyIdentifier,
      transaction: encryptedString,
    });
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

