import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse( { status: 200, type: User })
  @Post()
  create(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(CreateUserDto);
  }

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse( { status: 200, type: [User] })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }
}