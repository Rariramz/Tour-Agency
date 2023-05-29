import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class Tour extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  city_departure_id: string;

  @Column
  city_arrival_id: string;

  @Column
  country_departure_id: string;

  @Column
  country_arrival_id: string;

  @Column
  hotel_id: string;

  @Column(DataType.ARRAY(DataType.STRING))
  dates_departure: string[];

  @Column(DataType.ARRAY(DataType.INTEGER))
  nights_amounts: number[];

  @Column
  price: number;

  @Column
  currency: string;

  @Column
  guests: number;

  @Column
  description: string;

  @Column
  rating: number;

  @Column
  image_id: string;
}