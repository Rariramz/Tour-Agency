import { Module, forwardRef } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { toursProviders } from './tours.providers';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from 'src/users/users.module';
import { CountriesModule } from 'src/countries/countries.module';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    CountriesModule,
    FilesModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [ToursController],
  providers: [
    ToursService,
    ...toursProviders,
  ],
})
export class ToursModule {}
