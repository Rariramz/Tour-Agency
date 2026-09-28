import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { toursProviders } from './tours.providers';
import { DatabaseModule } from '../database/database.module';
import { CountriesModule } from 'src/countries/countries.module';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [DatabaseModule, CountriesModule, FilesModule, AuthModule],
  controllers: [ToursController, ReservationsController],
  providers: [ToursService, ...toursProviders],
})
export class ToursModule {}
