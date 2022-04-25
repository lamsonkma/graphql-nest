import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersResolver } from './owners.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { BullModule } from '@nestjs/bull';
import { ownerConsumer } from './ownerConsumer';

@Module({
  providers: [OwnersResolver, OwnersService, ownerConsumer],
  imports: [
    TypeOrmModule.forFeature([Owner]),
    BullModule.registerQueueAsync({
      name: 'owner',
    }),
  ],
  exports: [OwnersService],
})
export class OwnersModule {}
