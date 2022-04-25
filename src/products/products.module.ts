import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    BullModule.registerQueueAsync({
      name: 'Product',
    }),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
