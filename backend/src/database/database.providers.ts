import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { SEQUELIZE_PROVIDER } from '../constants';
import { Tour } from '../tours/tour.entity';
import { User } from 'src/users/user.entity';
import { Role } from 'src/roles/role.entity';
import { seedDatabase } from './database.seed';
import { UserTour } from 'src/tours/user-tours.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE_PROVIDER,
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: config.getOrThrow<number>('DB_PORT'),
        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_NAME'),
      });
      sequelize.addModels([Tour, User, Role, UserTour]);
      await sequelize.sync();
      await seedDatabase(sequelize);
      return sequelize;
    },
  },
];
