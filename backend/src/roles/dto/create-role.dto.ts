import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'User role name'})
  @IsString({ message: 'Must be string' })
  readonly name: string;
}
