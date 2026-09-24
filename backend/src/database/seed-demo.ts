import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { copyFile, mkdir } from 'fs/promises';
import * as path from 'path';
import { AppModule } from '../app.module';
import { SEQUELIZE_PROVIDER } from '../constants';
import { Tour } from '../tours/tour.entity';
import { cities } from '../countries/json/cities';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { ADMIN_ROLE } from '../constants';
import * as bcrypt from 'bcryptjs';

async function seedDemo() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });
  const database = app.get<Sequelize>(SEQUELIZE_PROVIDER);
  try {
    const config = app.get(ConfigService);
    if (
      config.get('NODE_ENV') === 'production' ||
      !['localhost', '127.0.0.1'].includes(config.get('DB_HOST'))
    ) {
      throw new Error(
        'Demo tours may only be seeded into a local development database.',
      );
    }
    const adminEmail = config.get<string>('DEMO_ADMIN_EMAIL');
    const adminPassword = config.get<string>('DEMO_ADMIN_PASSWORD');
    if (!adminEmail || !adminPassword || adminPassword.length < 8) {
      throw new Error(
        'DEMO_ADMIN_EMAIL and a DEMO_ADMIN_PASSWORD of at least 8 characters are required.',
      );
    }
    const adminRole = await Role.findOne({ where: { name: ADMIN_ROLE } });
    if (!adminRole) throw new Error('Admin role is not configured');
    await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 12),
        roleId: adminRole.id,
      } as User,
    });
    const departure = cities.find(
      (city) => city.name === 'Warsaw' && city.country_code === 'PL',
    );
    if (!departure) throw new Error('Departure city missing from dataset');
    const destinations = [
      {
        name: 'Lisbon',
        country: 'PT',
        photo: '111.jpg',
        price: 780,
        nights: 5,
        description:
          'Explore Lisbon at your own pace, with time for its historic streets, waterfront and local food. Sample accommodation photo.',
      },
      {
        name: 'Barcelona',
        country: 'ES',
        photo: '222.jpg',
        price: 940,
        nights: 7,
        description:
          'A relaxed city break with architecture, neighbourhood walks and time by the Mediterranean. Sample accommodation photo.',
      },
      {
        name: 'Rome',
        country: 'IT',
        photo: '333.jpg',
        price: 860,
        nights: 6,
        description:
          'Discover historic squares, ancient landmarks and Italian cooking on a flexible Rome getaway. Sample accommodation photo.',
      },
    ];
    const imageDirectory = path.resolve(process.cwd(), 'uploads');
    await mkdir(imageDirectory, { recursive: true });
    for (const destination of destinations) {
      const arrival = cities.find(
        (city) =>
          city.name === destination.name &&
          city.country_code === destination.country,
      );
      if (!arrival) throw new Error(`Destination missing: ${destination.name}`);
      const image = `demo-${destination.name.toLowerCase()}.jpg`;
      await copyFile(
        path.resolve(
          process.cwd(),
          '../frontend/src/shared/assets/hotels',
          destination.photo,
        ),
        path.join(imageDirectory, image),
      );
      const datesDeparture = [30, 60, 90].map((days) => {
        const date = new Date();
        date.setUTCDate(date.getUTCDate() + days);
        return date.toISOString().slice(0, 10);
      });
      await Tour.findOrCreate({
        where: { hotelId: `demo-${destination.name.toLowerCase()}` },
        defaults: {
          cityDepartureId: String(departure.id),
          countryDepartureId: String(departure.country_id),
          cityArrivalId: String(arrival.id),
          countryArrivalId: String(arrival.country_id),
          hotelId: `demo-${destination.name.toLowerCase()}`,
          datesDeparture,
          nightsAmount: destination.nights,
          price: destination.price,
          currency: 'EUR',
          guests: 2,
          description: destination.description,
          rating: 4,
          image,
        },
      });
    }
    console.log(
      `Demo tours and admin ${adminEmail} are ready. Existing records were preserved.`,
    );
  } finally {
    await database.close();
    await app.close();
  }
}

seedDemo().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
