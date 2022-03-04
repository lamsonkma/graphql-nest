import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet-dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    private ownerService: OwnersService,
  ) {}

  async create(createPetInput: CreatePetDto): Promise<Pet> {
    const pet = await this.petRepository.create(createPetInput);
    return this.petRepository.save(pet);
  }

  async findOne(id: number) {
    return this.petRepository.findOneOrFail(id);
  }
  async findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }
  getOwner(ownerId: number) {
    return this.ownerService.findOne(ownerId);
  }
}
