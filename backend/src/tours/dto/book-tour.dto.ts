import { ApiProperty } from "@nestjs/swagger";

export class BookTourDto {
    @ApiProperty({ example: 'qwerty@qwerty.com', description: 'User email' })
  readonly userEmail: string;

  @ApiProperty({ example: '12.06.2023', description: 'Departure date formatted to string' })
  readonly dateDeparture: string;

  @ApiProperty({ example: 7, description: 'Amount of nights'})
  readonly nightsAmount: number;

  @ApiProperty({ example: 1000, description: 'Price'})
  readonly price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  readonly currency: string;

  @ApiProperty({ example: 2, description: 'Amount of guests'})
  readonly guests: number;
}
