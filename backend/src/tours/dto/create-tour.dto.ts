import { ApiProperty } from "@nestjs/swagger";

export class CreateTourDto {
  @ApiProperty({ example: '22', description: 'Unique identifier of departure city'})
  readonly cityDepartureId: string;

  @ApiProperty({ example: '33', description: 'Unique identifier of arrival city'})
  readonly cityArrivalId: string;

  @ApiProperty({ example: '2', description: 'Unique identifier of departure country'})
  readonly countryDepartureId: string;

  @ApiProperty({ example: '3', description: 'Unique identifier of arrival country'})
  readonly countryArrivalId: string;

  @ApiProperty({ example: '5', description: 'Unique identifier of hotel'})
  readonly hotelId: string;

  @ApiProperty({
    example: '["12.06.2023", "14.06.2023", "20.06.2023"]',
    description: 'Array of departure dates formatted to string'
  })
  readonly datesDeparture: string[];

  @ApiProperty({ example: '7', description: 'Amount of nights for the provided price'})
  readonly nightsAmount: number;

  @ApiProperty({ example: '1000', description: 'Price'})
  readonly price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  readonly currency: string;

  @ApiProperty({ example: '2', description: 'Amount of guests for the provided price'})
  readonly guests: number;

  @ApiProperty({ example: 'Warm sea, nice beach, cozy hotel', description: 'Description'})
  readonly description: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5'})
  readonly rating: number;

  @ApiProperty({ example: '23', description: 'Unique identifier of image'})
  readonly imageId: string;
}
