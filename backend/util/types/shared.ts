export type Environment = 'development' | 'production';
export type OrderEvent = {
  eventName: string; // The name of the event
  args: {
    indexedClientAddress: string; // The indexed client address
    indexedSellerAddress: string; // The indexed seller address
    price: bigint; // The price in Wei
    transactionValueProof: bigint; // Proof of transaction value
    productName: string; // Name of the product
    productId: string; // Product ID
    clientAddress: string; // The client address
    sellerAddress: string; // The seller address
  };
  removed: boolean; // Whether the log is removed
  logIndex: number; // Log index in the block
  transactionIndex: number; // Transaction index in the block
  transactionHash: string; // Hash of the transaction
  blockHash: string; // Hash of the block
  blockNumber: bigint; // Block number
  address: string; // Contract address
  data: string; // Data emitted in the event
  topics: string[]; // Topics for the event
}
