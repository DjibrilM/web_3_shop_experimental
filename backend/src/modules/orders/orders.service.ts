import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { generateKeyPairSync } from 'util/encryption';
import { unwatchOrderEvent } from 'util/viem';
import { asymmetric } from '../../../util/encryption';
import * as NodeCache from 'node-cache';
import { OrderEvent } from 'util/types/shared';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  cash: NodeCache;
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {
    this.cash = new NodeCache();
  }

  async requestKey() {
    const keysDurationTimeInStorage = 1000 * 120;
    const keys = generateKeyPairSync();
    const keyStorageLocation = uuidv4();
    const privateKey = keys.privateKey;

    const publicKey = keys.publicKey
      .split('\n')
      .filter((line) => !line.startsWith('-----'))
      .join('');

    const serialize = JSON.stringify({ privateKey, publicKey });
    this.cash.set(keyStorageLocation, serialize, keysDurationTimeInStorage);

    return {
      publicKey,
      keyIdentifier: keyStorageLocation,
    };
  }

  findAll(clientAddress: string) {
    return this.orderModel.find({ client: clientAddress }).populate('product');
  }

  findSellerOrders(id: string) {
    return this.orderModel.find({ seller: id }).populate('product');
  }

  processOrder(logs: OrderEvent[]) {
    try {
      logs.forEach(async (log) => {
        const find = await this.orderModel.findOne({
          transactionHash: log.transactionHash,
        });

        if (!find) {
          await this.orderModel.create({
            transactionHash: log.transactionHash,
            seller: log.args.sellerAddress,
            client: log.args.clientAddress,
            product: log.args.productId,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  onModuleInit() {
    unwatchOrderEvent((logs: OrderEvent[]) => this.processOrder(logs));
  }
}
