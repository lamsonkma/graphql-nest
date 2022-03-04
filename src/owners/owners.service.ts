import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}
  async create(createOwnerInput: CreateOwnerInput) {
    const owner = await this.ownerRepository.findOne({
      email: createOwnerInput.email,
    });
    if (owner) {
      throw new BadRequestException('Owner already exists');
    } else {
      const createOwner = await this.ownerRepository.create(createOwnerInput);
      return this.ownerRepository.save(createOwner);
    }
  }

  findAll() {
    return this.ownerRepository.find();
  }

  findOne(id: number) {
    return this.ownerRepository.findOne(id);
  }

  async findByEmail(email: string) {
    const owner = await this.ownerRepository.findOne({ email: email });
    if (!owner) {
      return null;
    }
    return owner;
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
