import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.entity";
import { CreateRoleDto } from "./dto/create-role.dto";

@Table({ tableName: 'roles'})
export class Role extends Model<Role, CreateRoleDto> {
  @ApiProperty({ example: 1, description: 'Unique identifier'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'User role name'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => User)
  users: User[];
}
