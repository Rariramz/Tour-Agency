import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ADMIN_ROLE } from 'src/constants';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Role creation' })
  @ApiResponse( { status: 200 })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }
  
  @ApiOperation({ summary: 'Getting role by name' })
  @ApiResponse( { status: 200 })
  @Roles(ADMIN_ROLE)
  @UseGuards(RolesGuard)
  @Get('/:name')
  getByName(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name);
  }
}
