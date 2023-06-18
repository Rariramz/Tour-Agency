import { Table, Column, Model, PrimaryKey, DataType, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { CreateTourDto } from './dto/create-tour.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { UserTour } from './user-tours.entity';

@Table({ tableName: 'tours' })
export class Tour extends Model<Tour> {
  @ApiProperty({ example: 1, description: 'Unique identifier'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  //FK
  @ApiProperty({ example: '22', description: 'Unique identifier of departure city'})
  @Column({ type: DataType.STRING })
  cityDepartureId: string;

  //FK
  @ApiProperty({ example: '33', description: 'Unique identifier of arrival city'})
  @Column({ type: DataType.STRING })
  cityArrivalId: string;

  //FK
  @ApiProperty({ example: '2', description: 'Unique identifier of departure country'})
  @Column({ type: DataType.STRING })
  countryDepartureId: string;

  //FK
  @ApiProperty({ example: '3', description: 'Unique identifier of arrival country'})
  @Column({ type: DataType.STRING })
  countryArrivalId: string;

  //FK
  @ApiProperty({ example: '5', description: 'Unique identifier of hotel'})
  @Column({ type: DataType.STRING })
  hotelId: string;

  @ApiProperty({
    example: '["12.06.2023", "14.06.2023", "20.06.2023"]',
    description: 'Array of departure dates formatted to string'
  })
  @Column(DataType.ARRAY(DataType.STRING))
  datesDeparture: string[];

  @ApiProperty({ example: '7', description: 'Amount of nights for the provided price'})
  @Column({ type: DataType.INTEGER })
  nightsAmount: number;

  @ApiProperty({ example: '1000', description: 'Price'})
  @Column({ type: DataType.INTEGER })
  price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  @Column({ type: DataType.STRING })
  currency: string;

  @ApiProperty({ example: '2', description: 'Amount of guests for the provided price'})
  @Column({ type: DataType.INTEGER })
  guests: number;

  @ApiProperty({ example: 'Warm sea, nice beach, cozy hotel', description: 'Description'})
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5'})
  @Column({ type: DataType.INTEGER })
  rating: number;

  @ApiProperty({ example: '23', description: 'Unique identifier of image'})
  @Column({ type: DataType.STRING })
  image: string;

  @BelongsToMany(() => User, () => UserTour)
  users: User[];
}