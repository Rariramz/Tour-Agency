import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

class CreateRoleResponse {
  @ApiProperty({ example: '123gfjgfuuiyg2i0123ij1i32jo5x', description: 'Token'})
  token: string;
}

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse( { status: 200, type: CreateRoleResponse })
  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse( { status: 200, type: CreateRoleResponse })
  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
