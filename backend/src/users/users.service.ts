import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CLIENT_ROLE, USERS_REPOSITORY } from '../constants';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

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

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.findAll({ include: { all: true }});
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email }, include: { all: true }});
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.usersRepository.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getRoleByName(addRoleDto.name);
    if (role && user) {
      user.role = role;
      user.roleId = role.id;
      await user.save();
      return addRoleDto;
    }
    throw new HttpException('User or role is not found', HttpStatus.NOT_FOUND);
  }
}