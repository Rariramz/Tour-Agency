import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
  ],
  imports: [
    DatabaseModule,
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
