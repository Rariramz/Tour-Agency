import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders
  ],
})
export class UsersModule {}