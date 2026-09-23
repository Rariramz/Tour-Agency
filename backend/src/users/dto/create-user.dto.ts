import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'email@mail.com', description: 'Email'})
  @IsString({ message: 'Email must be string' })
  @IsEmail({},  { message: 'Email is incorrect' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
  readonly email: string;

  @ApiProperty({ example: '123456x87k', description: 'Password'})
  @IsString({ message: 'Password must be string' })
  @Length(8, 72, { message: 'Password must be 8 to 72 characters' })
  readonly password: string;
}
