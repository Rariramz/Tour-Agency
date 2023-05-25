import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToursController } from './tours/tours.controller';
import { ToursService } from './tours/tours.service';

@Module({
  imports: [],
  controllers: [AppController, ToursController],
  providers: [AppService, ToursService],
})
export class AppModule {}
