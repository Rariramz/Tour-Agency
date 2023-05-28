import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { toursProviders } from './tours.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ToursController],
  providers: [
    ToursService,
    ...toursProviders,
  ],
})
export class ToursModule {}