import { ApiProperty } from "@nestjs/swagger";

export class PayUserTourDto {
    @ApiProperty({ example: 'qwerty@qwerty.com', description: 'User email' })
  readonly userEmail: string;

  @ApiProperty({ example: 1, description: 'User tour id' })
  readonly userTourId: string;
}
