import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class Tour extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;
}