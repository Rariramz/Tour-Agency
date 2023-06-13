import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '../constants';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: typeof User
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(createUserDto);
    return user;
  }

  async findAllUsers() {
    const users = await this.usersRepository.findAll();
    return users;
  }
}