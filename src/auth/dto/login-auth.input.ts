import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class LoginOwnerInput {
  @Column()
  @IsEmail()
  @Field()
  email: string;

  @Column()
  @IsString()
  @Field()
  password: string;
}
