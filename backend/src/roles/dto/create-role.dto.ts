import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'User role name'})
  readonly name: string;
}
