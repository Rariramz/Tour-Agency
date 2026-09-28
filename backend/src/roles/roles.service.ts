import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { ROLES_REPOSITORY } from 'src/constants';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private rolesRepository: typeof Role
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.rolesRepository.create(createRoleDto);
    return role;
  }

  async getRoleByName(name: string) {
    const role = this.rolesRepository.findOne({ where: { name } });
    return role;
  }
}
