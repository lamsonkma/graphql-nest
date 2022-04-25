import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;
  @Column()
  @Field()
  name: string;
  @ManyToOne(() => Owner, (owner) => owner.pets)
  @Field(() => Owner)
  owner: Owner;
}
