import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner, UserRole } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { CurrentOwner } from 'src/decorator/current-owner.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth-guard';
import { LocalAuthGuard } from 'src/auth/guard/local-auth-guard';
import { JwtStrategy, LocalStrategy } from 'src/auth/strategies';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/decorator/roles.decorator';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Query(() => Owner, { name: 'owner' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @Query(() => Owner, { name: 'ownerByEmail' })
  findByEmail(
    @CurrentOwner() owner: Owner,
    @Args('email', { type: () => String }) email: string,
  ) {
    return this.ownersService.findByEmail(email);
  }

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }
}
