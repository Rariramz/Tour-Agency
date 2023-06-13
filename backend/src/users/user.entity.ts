import { Column, DataType, Model, Table } from "sequelize-typescript";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'users'})
export class User extends Model<User, CreateUserDto> {
  @ApiProperty({ example: '1', description: 'Unique identifier'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({ example: 'email@mail.com', description: 'Email'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({ example: '123456x87k', description: 'Password'})
  @Column({ type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({ example: 'true', description: 'Is user banned'})
  @Column({ type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @ApiProperty({ example: 'spam', description: 'Ban reason'})
  @Column({ type: DataType.STRING, allowNull: true})
  banReason: string;
}