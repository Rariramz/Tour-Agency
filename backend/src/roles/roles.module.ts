import { Module, forwardRef } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { rolesProviders } from './roles.providers';
import { User } from 'src/users/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    ...rolesProviders,
    User
  ],
  exports: [RolesService],
  imports: [
    forwardRef(() => AuthModule)
  ]
})
export class RolesModule {}
