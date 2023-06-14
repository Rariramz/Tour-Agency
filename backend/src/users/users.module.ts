import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { Role } from 'src/roles/role.entity';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    Role
  ],
})
export class UsersModule {}