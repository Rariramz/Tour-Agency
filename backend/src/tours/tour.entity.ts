import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Tour extends Model {
  @Column
  id: string;

  @Column
  name: string;
}