import { parseAbiItem } from 'viem';
import { publicClient } from './client';
import { EventFilter } from 'ethers';
import { PAYMENT_GATEWAY_CONTRACT_ADDRESS } from 'util/constants';
import { OrderEvent } from 'util/types/shared';

export const unwatchOrderEvent = (callBack: Function) =>
  publicClient.watchEvent({
    address: PAYMENT_GATEWAY_CONTRACT_ADDRESS,
    event: parseAbiItem(
      'event Order(uint256 price, uint256 transactionValueProof, string productName, string productId, address indexed indexedClientAddress, address indexed indexedSellerAddress, address clientAddress, address sellerAddress)',
    ),
    onLogs: (logs: OrderEvent[]) => callBack(logs),
  });



       
        