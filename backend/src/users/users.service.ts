import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CLIENT_ROLE, USERS_REPOSITORY } from '../constants';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import * as bcrypt from 'bcryptjs';
import { UniqueConstraintError } from 'sequelize';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: typeof User,
    private rolesService: RolesService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.rolesService.getRoleByName(CLIENT_ROLE);
    if (!role) throw new Error('Client role is not configured');
    try {
      return await this.usersRepository.create({
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 12),
        roleId: role.id,
      } as User);
    } catch (error) {
      if (error instanceof UniqueConstraintError) throw new ConflictException('Account already exists');
      throw error;
    }
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.findAll({ include: { all: true }});
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email }, include: { all: true }});
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findByPk(id, { include: { all: true } });
    if (!user || user.banned) throw new UnauthorizedException('Account is unavailable');
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
