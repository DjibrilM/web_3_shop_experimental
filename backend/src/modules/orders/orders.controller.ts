import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { OrdersService } from './orders.service';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('request-key')
  requestKey() {
    return this.ordersService.requestKey();
  }

  @Get('client/:walletAddress')
  findAll(@Param('walletAddress') clientAddress: string) {
    return this.ordersService.findAll(clientAddress);
  }

  @Get('seller/:walletAddress')
  findSellerAll(@Param('walletAddress') clientAddress: string) {
    return this.ordersService.findSellerOrders(clientAddress);
  }
}
