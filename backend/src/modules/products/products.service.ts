import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create({
      ...createProductDto,
    });
  }


  async findSellerProducts(sellerAddress: string) {
    return await this.productModel.find({ owner: sellerAddress });
  }


  async findAll() {
    return await this.productModel.find();
  }

}
