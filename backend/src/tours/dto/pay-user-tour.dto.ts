import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class PayUserTourDto {
  @ApiProperty({ example: 'qwerty@qwerty.com', description: 'User email' })
  @IsString({ message: 'Must be string' })
  @IsEmail({},  { message: 'Email is incorrect' })
  readonly userEmail: string;

  @ApiProperty({ example: 1, description: 'User tour id' })
  @IsString({ message: 'Must be string' })
  readonly userTourId: string;
}
