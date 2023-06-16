import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { Role } from 'src/roles/role.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    Role
  ],
  imports: [RolesModule],
  exports: [UsersService]
})
export class UsersModule {}