import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToursModule } from './tours/tours.module';
import { CountriesController } from './countries/countries.controller';
import { CountriesService } from './countries/countries.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ToursModule,
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController, CountriesController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
