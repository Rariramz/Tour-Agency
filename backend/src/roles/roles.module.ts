import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { rolesProviders } from './roles.providers';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    ...rolesProviders,
    User
  ],
  exports: [RolesService]
})
export class RolesModule {}
