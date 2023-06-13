import { ApiProperty } from "@nestjs/swagger";

export class CreateTourDto {
  @ApiProperty({ example: '22', description: 'Unique identifier of departure city'})
  city_departure_id: string;

  @ApiProperty({ example: '33', description: 'Unique identifier of arrival city'})
  city_arrival_id: string;

  @ApiProperty({ example: '2', description: 'Unique identifier of departure country'})
  country_departure_id: string;

  @ApiProperty({ example: '3', description: 'Unique identifier of arrival country'})
  country_arrival_id: string;

  @ApiProperty({ example: '5', description: 'Unique identifier of hotel'})
  hotel_id: string;

  @ApiProperty({
    example: '["12.06.2023", "14.06.2023", "20.06.2023"]',
    description: 'Array of departure dates formatted to string'
  })
  dates_departure: string[];

  @ApiProperty({ example: '7', description: 'Amount of nights for the provided price'})
  nights_amount: number;

  @ApiProperty({ example: '1000', description: 'Price'})
  price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  currency: string;

  @ApiProperty({ example: '2', description: 'Amount of guests for the provided price'})
  guests: number;

  @ApiProperty({ example: 'Warm sea, nice beach, cozy hotel', description: 'Description'})
  description: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5'})
  rating: number;

  @ApiProperty({ example: '23', description: 'Unique identifier of image'})
  image_id: string;
}
