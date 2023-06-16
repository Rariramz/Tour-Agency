import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_ROLE, USERS_REPOSITORY } from '../constants';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: typeof User,
    private rolesService: RolesService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(createUserDto);
    const role = await this.rolesService.getRoleByName(CLIENT_ROLE);
    user.role = role;
    user.roleId = role.id;
    await user.save();
    return user;
  }

  async findAllUsers() {
    const users = await this.usersRepository.findAll({ include: { all: true }});
    return users;
  }
}