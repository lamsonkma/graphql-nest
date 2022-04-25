import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;
  @Column()
  @Field()
  title: string;
  @Column()
  @Field()
  description: string;
  @Column()
  @Field()
  price: number;
}
