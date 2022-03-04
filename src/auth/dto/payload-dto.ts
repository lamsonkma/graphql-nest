import { Injectable } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Column } from 'typeorm';

@Injectable()
export class PayloadDto {
  @Column()
  @Field()
  @IsEmail()
  email: string;
  @Column()
  @Field()
  name: string;
}
