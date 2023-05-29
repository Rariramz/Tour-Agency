import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToursModule } from './tours/tours.module';
import { CountriesController } from './countries/countries.controller';
import { CountriesService } from './countries/countries.service';

@Module({
  imports: [ToursModule],
  controllers: [AppController, CountriesController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
