import { Environment } from 'util/types/shared';

export const environment = process.env.ENVIRONMENT as Environment;
export const MONGO_URI =
  environment === 'development'
    ? 'mongodb://localhost/crypto_payment_gateway'
    : '';

export const PAYMENT_GATEWAY_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_CONTRACT_ADDRESS ||
  '0x4c5859f0F772848b2D91F1D83E2Fe57935348029';
