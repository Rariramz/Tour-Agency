import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { Role } from 'src/roles/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Tour } from 'src/tours/tour.entity';
import { UserTour } from 'src/tours/user-tours.entity';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    Role,
    Tour,
    UserTour
  ],
  imports: [
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}