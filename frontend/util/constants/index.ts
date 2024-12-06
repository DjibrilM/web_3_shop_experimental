
export const BACKEN_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";
export const PAYMENT_GATEWAY_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_CONTRACT_ADDRESS ||
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export { default as paymentGatewayAbi } from './abis/PaymentGateway.abi';
export { default as queryKeys } from "./queryKeys";
