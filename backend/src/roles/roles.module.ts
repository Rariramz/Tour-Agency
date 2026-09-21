import { Module, forwardRef } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { rolesProviders } from './roles.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    ...rolesProviders,
  ],
  exports: [RolesService],
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule)
  ]
})
export class RolesModule {}
