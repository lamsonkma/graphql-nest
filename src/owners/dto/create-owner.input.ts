import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateOwnerInput {
  @Column()
  @Field()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  @Field()
  email: string;

  @Column()
  @IsString()
  @Field()
  password: string;
}
