import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Owner } from './entities/owner.entity';

@Processor('owner')
export class ownerConsumer {
  constructor(@InjectQueue('owner') private ownerQueue: Queue) {}
  @Process('listOwner')
  listOwner(job: Job<unknown>) {
    console.log(job.data);
  }
}
