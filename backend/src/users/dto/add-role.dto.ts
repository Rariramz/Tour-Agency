import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role name'})
  @IsString({ message: 'Must be string' })
  readonly name: string;

  @ApiProperty({ example: '1', description: 'User id'})
  @IsNumber({}, { message: 'Must be integer' })
  readonly userId: number;
}
