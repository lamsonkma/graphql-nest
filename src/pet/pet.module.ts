import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetResolver } from './pet.resolver';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { OwnersModule } from 'src/owners/owners.module';
@Module({
  providers: [PetResolver, PetService],
  imports: [TypeOrmModule.forFeature([Pet]),OwnersModule],
})
export class PetModule {}
