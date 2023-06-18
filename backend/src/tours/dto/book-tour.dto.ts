import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class BookTourDto {
  @ApiProperty({ example: 'qwerty@qwerty.com', description: 'User email' })
  @IsString({ message: 'Must be string' })
  @IsEmail({},  { message: 'Email is incorrect' })
  readonly userEmail: string;

  @ApiProperty({ example: '12.06.2023', description: 'Departure date formatted to string' })
  @IsString({ message: 'Must be string' })
  readonly dateDeparture: string;

  @ApiProperty({ example: 7, description: 'Amount of nights'})
  @IsNumber({}, { message: 'Must be integer' })
  readonly nightsAmount: number;

  @ApiProperty({ example: 1000, description: 'Price'})
  @IsNumber({}, { message: 'Must be integer' })
  readonly price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  @IsString({ message: 'Must be string' })
  readonly currency: string;

  @ApiProperty({ example: 2, description: 'Amount of guests'})
  @IsNumber({}, { message: 'Must be integer' })
  readonly guests: number;
}
