import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'email@mail.com', description: 'Email'})
  @IsString({ message: 'Email must be string' })
  @IsEmail({},  { message: 'Email is incorrect' })
  readonly email: string;

  @ApiProperty({ example: '123456x87k', description: 'Password'})
  @IsString({ message: 'Password must be string' })
  @Length(8, 25, { message: 'Length must be > 8 and < 15' })
  readonly password: string;
}
