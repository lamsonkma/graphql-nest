import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateProductInput {
  @Column()
  @Field()
  @IsString()
  title: string;
  @Column()
  @Field()
  @IsString()
  description: string;
  @Column()
  @Field()
  @IsNumber()
  price: number;
}
