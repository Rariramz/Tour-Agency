import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LikeTourDto {
  @ApiProperty({ example: 'qwerty@qwerty.com', description: 'User email' })
  @IsString({ message: 'Must be string' })
  readonly userEmail: string;
}
