import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTourDto {
  @ApiProperty({ example: '22', description: 'Unique identifier of departure city'})
  @IsString({ message: 'Must be string' })
  readonly cityDepartureId: string;

  @ApiProperty({ example: '33', description: 'Unique identifier of arrival city'})
  @IsString({ message: 'Must be string' })
  readonly cityArrivalId: string;

  @ApiProperty({ example: '2', description: 'Unique identifier of departure country'})
  @IsString({ message: 'Must be string' })
  readonly countryDepartureId: string;

  @ApiProperty({ example: '3', description: 'Unique identifier of arrival country'})
  @IsString({ message: 'Must be string' })
  readonly countryArrivalId: string;

  @ApiProperty({ example: '5', description: 'Unique identifier of hotel'})
  @IsString({ message: 'Must be string' })
  readonly hotelId: string;

  @ApiProperty({
    example: '["12.06.2023", "14.06.2023", "20.06.2023"]',
    description: 'Array of departure dates formatted to string'
  })
  @IsString({ message: 'Must be string' })
  readonly datesDeparture: string[];

  @ApiProperty({ example: '7', description: 'Amount of nights for the provided price'})
  @IsNumber({}, { message: 'Must be integer' })
  readonly nightsAmount: number;

  @ApiProperty({ example: '1000', description: 'Price'})
  @IsNumber({}, { message: 'Must be integer' })
  readonly price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  @IsString({ message: 'Must be string' })
  readonly currency: string;

  @ApiProperty({ example: '2', description: 'Amount of guests for the provided price'})
  @IsNumber({}, { message: 'Must be integer' })
  readonly guests: number;

  @ApiProperty({ example: 'Warm sea, nice beach, cozy hotel', description: 'Description'})
  @IsString({ message: 'Must be string' })
  readonly description: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5'})
  @IsNumber({}, { message: 'Must be integer' })
  readonly rating: number;
}
