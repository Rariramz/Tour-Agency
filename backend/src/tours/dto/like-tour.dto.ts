import { ApiProperty } from "@nestjs/swagger";

export class LikeTourDto {
    @ApiProperty({ example: 'qwerty@qwerty.com', description: 'User email' })
  readonly userEmail: string;
}
