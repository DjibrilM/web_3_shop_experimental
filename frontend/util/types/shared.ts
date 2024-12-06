export type User = {
  walletAddress: string;
  balance: number;
  isSeller: boolean;
  validators: string[];
};

export type Address = `0x${string}`;
export type Product = {
  name: string;
  price: number;
  imageUrl: string;
  owner: Address
  _id:string
};
export type Order = {
  seller: string;
  client: string;
  product: Product,
  transactionHash: string;
  processed: boolean;
  _id:string
};
