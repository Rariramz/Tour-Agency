import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse( { status: 200, type: User })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) createUserDto: CreateUserDto) {
    return this.authService.publicUser(await this.usersService.createUser(createUserDto));
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse( { status: 200, type: [User] })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return (await this.usersService.findAllUsers()).map((user) => this.authService.publicUser(user));
  }

  @ApiOperation({ summary: 'Adding role' })
  @ApiResponse( { status: 200 })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }
}
