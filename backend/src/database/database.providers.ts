import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE_PROVIDER } from '../constants';
import { Tour } from '../tours/tour.entity';
import { User } from 'src/users/user.entity';
import { Role } from 'src/roles/role.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE_PROVIDER,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([Tour, User, Role]);
      await sequelize.sync();
      return sequelize;
    },
  },
];