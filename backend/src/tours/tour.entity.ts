import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';
import { CreateTourDto } from './dto/create-tour.dto';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'tours' })
export class Tour extends Model<Tour, CreateTourDto> {
  @ApiProperty({ example: '1', description: 'Unique identifier'})
  @Column({ type: DataType.STRING, unique: true, autoIncrement: true, primaryKey: true})
  id: string;

  @ApiProperty({ example: '22', description: 'Unique identifier of departure city'})
  @Column
  city_departure_id: string;

  @ApiProperty({ example: '33', description: 'Unique identifier of arrival city'})
  @Column
  city_arrival_id: string;

  @ApiProperty({ example: '2', description: 'Unique identifier of departure country'})
  @Column
  country_departure_id: string;

  @ApiProperty({ example: '3', description: 'Unique identifier of arrival country'})
  @Column
  country_arrival_id: string;

  @ApiProperty({ example: '5', description: 'Unique identifier of hotel'})
  @Column
  hotel_id: string;

  @ApiProperty({
    example: '["12.06.2023", "14.06.2023", "20.06.2023"]',
    description: 'Array of departure dates formatted to string'
  })
  @Column(DataType.ARRAY(DataType.STRING))
  dates_departure: string[];

  @ApiProperty({ example: '7', description: 'Amount of nights for the provided price'})
  @Column
  nights_amount: number;

  @ApiProperty({ example: '1000', description: 'Price'})
  @Column
  price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  @Column
  currency: string;

  @ApiProperty({ example: '2', description: 'Amount of guests for the provided price'})
  @Column
  guests: number;

  @ApiProperty({ example: 'Warm sea, nice beach, cozy hotel', description: 'Description'})
  @Column
  description: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5'})
  @Column
  rating: number;

  @ApiProperty({ example: '23', description: 'Unique identifier of image'})
  @Column
  image_id: string;
}