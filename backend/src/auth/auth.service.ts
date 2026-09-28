import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    return this.generateToken(user);
  }

  async registration(createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    user.role = await user.$get('role');
    return this.generateToken(user);
  }

  async currentUser(id: number) {
    return this.publicUser(await this.userService.getUserById(id));
  }

  publicUser(user: User) {
    return { id: user.id, email: user.email, role: user.role?.name ?? 'CLIENT' };
  }

  private async generateToken(user: User) {
    const payload = { id: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: this.publicUser(user),
    }
  }

  private async validateUser(createUserDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(createUserDto.email);
    if (user && !user.banned) {
      const passwordEquals = await bcrypt.compare(createUserDto.password, user.password);
      if (passwordEquals)
      {
        return user;
      }
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
