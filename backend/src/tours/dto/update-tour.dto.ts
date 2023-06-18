import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateTourDto {
  @ApiProperty({ example: '22', description: 'Unique identifier of departure city'})
  @IsString({ message: 'Must be string' })
  city_departure_id: string;

  @ApiProperty({ example: '33', description: 'Unique identifier of arrival city'})
  @IsString({ message: 'Must be string' })
  city_arrival_id: string;

  @ApiProperty({ example: '2', description: 'Unique identifier of departure country'})
  @IsString({ message: 'Must be string' })
  country_departure_id: string;

  @ApiProperty({ example: '3', description: 'Unique identifier of arrival country'})
  @IsString({ message: 'Must be string' })
  country_arrival_id: string;

  @ApiProperty({ example: '5', description: 'Unique identifier of hotel'})
  @IsString({ message: 'Must be string' })
  hotel_id: string;

  @ApiProperty({
    example: '["12.06.2023", "14.06.2023", "20.06.2023"]',
    description: 'Array of departure dates formatted to string'
  })
  @IsString({ message: 'Must be array of strings' })
  dates_departure: string[];

  @ApiProperty({ example: '7', description: 'Amount of nights for the provided price'})
  @IsNumber({}, { message: 'Must be integer' })
  nights_amount: number;

  @ApiProperty({ example: '1000', description: 'Price'})
  @IsNumber({}, { message: 'Must be integer' })
  price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  @IsString({ message: 'Must be string' })
  currency: string;

  @ApiProperty({ example: '2', description: 'Amount of guests for the provided price'})
  @IsNumber({}, { message: 'Must be integer' })
  guests: number;

  @ApiProperty({ example: 'Warm sea, nice beach, cozy hotel', description: 'Description'})
  @IsString({ message: 'Must be string' })
  description: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5'})
  @IsNumber({}, { message: 'Must be integer' })
  rating: number;

  @ApiProperty({ example: '23', description: 'Unique identifier of image'})
  @IsString({ message: 'Must be string' })
  image_id: string;
}
