import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(createProductInput: CreateProductInput) {
    const newProduct = await this.productRepository.create(createProductInput);
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOne(id);
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    return await this.productRepository.update(id, updateProductInput);
  }

  async remove(id: number) {
    return await this.productRepository.delete(id);
  }
}
