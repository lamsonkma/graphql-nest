import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from 'src/pet/pet.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
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

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Field()
  role: UserRole;

  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field(() => [Pet], { nullable: true })
  pets?: Pet[];
}
