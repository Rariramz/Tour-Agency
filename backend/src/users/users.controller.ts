import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse( { status: 200, type: User })
  // @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse( { status: 200, type: [User] })
  // @Roles(ADMIN_ROLE)
  // @UseGuards(RolesGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Adding role' })
  @ApiResponse( { status: 200 })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }
}