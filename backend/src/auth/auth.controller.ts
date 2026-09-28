import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  login(@Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse( { status: 200, type: CreateRoleResponse })
  @Post('registration')
  registration(@Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() request: { user: { id: number } }) {
    return this.authService.currentUser(request.user.id);
  }
}
