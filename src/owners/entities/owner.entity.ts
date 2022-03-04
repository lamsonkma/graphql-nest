import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pet/pet.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;
  @Column()
  @Field()
  name: string;
  @Column()
  @Index()
  @Field()
  email: string;
  @Column()
  @Field()
  password: string;
  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field((type) => [Pet], { nullable: true })
  pets?: Pet[];
}
