import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { toursProviders } from './tours.providers';
import { DatabaseModule } from '../database/database.module';
import { User } from 'src/users/user.entity';
import { UserTour } from './user-tours.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ToursController],
  providers: [
    ToursService,
    ...toursProviders,
    User,
    UserTour
  ],
})
export class ToursModule {}