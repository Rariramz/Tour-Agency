import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, Max, Min } from 'class-validator';

export class BookTourDto {
  @ApiProperty({
    example: '2027-06-12',
    description: 'One of the tour departure dates',
  })
  @IsDateString({}, { message: 'Departure date must be a valid date' })
  readonly departureDate: string;

  @ApiProperty({
    example: 2,
    minimum: 1,
    maximum: 10,
    description: 'Amount of guests',
  })
  @IsInt({ message: 'Guests must be an integer' })
  @Min(1)
  @Max(10)
  readonly guests: number;
}
