import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>, // @InjectQueue('owner') private ownerQueue: Queue,
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

  async findAll() {
    return await this.ownerRepository.find();
  }

  async findOne(id: number) {
    const owner = await this.ownerRepository.findOne(id);
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }
    return owner;
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
