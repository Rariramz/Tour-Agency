import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'email@mail.com', description: 'Email'})
  readonly email: string;

  @ApiProperty({ example: '123456x87k', description: 'Password'})
  readonly password: string;
}
