import { Controller, Get, Post, Body, Param, } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('seller/:walletAddress')
  async findSellerProduct(@Param('walletAddress') walletAddress:string) {
    return await this.productsService.findSellerProducts(walletAddress);
  }
}
