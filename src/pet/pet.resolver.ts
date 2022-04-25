import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetDto } from './dto/create-pet-dto';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Resolver((of) => Pet)
export class PetResolver {
  constructor(private petService: PetService) {}

  @Query((returns) => [Pet])
  getAllPet(): Promise<Pet[]> {
    return this.petService.findAll();
  }
  @Mutation((returns) => Pet)
  create(@Args('createInput') createInput: CreatePetDto): Promise<Pet> {
    return this.petService.create(createInput);
  }
  @Query((returns) => Pet)
  getPet(@Args('id') id: number) {
    return this.petService.findOne(id);
  }
  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet) {
    return this.petService.getOwner(pet.owner.id);
  }
}
