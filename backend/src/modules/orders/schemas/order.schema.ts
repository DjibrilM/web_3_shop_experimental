import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import { Product } from 'src/modules/products/entities/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  seller: string;

  @Prop({ required: true })
  client: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product: Product;

  @Prop({ required: true })
  transactionHash: string;

  @Prop({ required: true, default: false })
  processed: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
