import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Tour } from './tour.entity';

@Table({ tableName: 'user_tours', createdAt: false, updatedAt: false })
export class UserTour extends Model<UserTour> {
  @ApiProperty({ example: 1, description: 'Unique identifier'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ForeignKey(() => User)
  @ApiProperty({ example: 22, description: 'User id'})
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false})
  userId: number;

  @ForeignKey(() => Tour)
  @ApiProperty({ example: 22, description: 'Tour id'})
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false})
  tourId: number;

  @ApiProperty({
    example: '12.06.2023',
    description: 'Departure date formatted to string'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  departureDate: string;

  // @ApiProperty({
  //   example: '19.06.2023',
  //   description: 'Return date formatted to string'
  // })
  // @Column({ type: DataType.STRING, allowNull: false })
  // returnDate: string;

  @ApiProperty({ example: 7, description: 'Amount of nights'})
  @Column({ type: DataType.INTEGER, allowNull: false})
  nightsAmount: number;

  @ApiProperty({ example: '1000', description: 'Price'})
  @Column({ type: DataType.INTEGER, allowNull: false})
  price: number;

  @ApiProperty({ example: 'USD', description: 'Currency'})
  @Column({ type: DataType.STRING, allowNull: false })
  currency: string;

  @ApiProperty({ example: 2, description: 'Amount of guests'})
  @Column({ type: DataType.INTEGER, allowNull: false})
  guests: number;

  @ApiProperty({ example: 'UPCOMING', description: 'User tour status'})
  @Column({ type: DataType.STRING })
  status: string;
}