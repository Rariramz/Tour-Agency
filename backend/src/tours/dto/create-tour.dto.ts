import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDateString, IsInt, IsString, Matches, Max, MaxLength, Min } from 'class-validator';

export class CreateTourDto {
  @ApiProperty()
  @IsString()
  @Matches(/^\d+$/)
  cityDepartureId: string;
  @ApiProperty()
  @IsString()
  @Matches(/^\d+$/)
  cityArrivalId: string;
  @ApiProperty()
  @IsString()
  @Matches(/^\d+$/)
  countryDepartureId: string;
  @ApiProperty()
  @IsString()
  @Matches(/^\d+$/)
  countryArrivalId: string;
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  hotelId: string;
  @ApiProperty({ type: [String], example: ['2027-06-12'] })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    try { return JSON.parse(value); } catch { return value; }
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsDateString({ strict: true }, { each: true })
  datesDeparture: string[];
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  nightsAmount: number;
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  price: number;
  @ApiProperty({ example: 'EUR' })
  @Matches(/^[A-Z]{3}$/)
  currency: string;
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  guests: number;
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  description: string;
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}
