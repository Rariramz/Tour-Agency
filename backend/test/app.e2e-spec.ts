import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE_PROVIDER } from '../src/constants';
import { JwtService } from '@nestjs/jwt';
import { Tour } from '../src/tours/tour.entity';
import { unlink } from 'fs/promises';
import * as path from 'path';
import { User } from '../src/users/user.entity';
import { Role } from '../src/roles/role.entity';
import * as bcrypt from 'bcryptjs';
import { UserTour } from '../src/tours/user-tours.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.get<Sequelize>(SEQUELIZE_PROVIDER).close();
      await app.close();
    }
  });

  it('/api/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('can read tours from the configured database', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/tours')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('does not allow anonymous access to the user list', () => {
    return request(app.getHttpServer()).get('/api/users').expect(401);
  });

  it('returns useful errors for invalid and missing tour IDs', async () => {
    await request(app.getHttpServer())
      .get('/api/tours/not-a-number')
      .expect(400);
    await request(app.getHttpServer()).get('/api/tours/2147483647').expect(404);
  });

  it('preserves multipart departure dates and exposes the same contract for list, detail and update', async () => {
    const adminRole = await Role.findOne({ where: { name: 'ADMIN' } });
    const admin = await User.create({
      email: `tour-admin-${Date.now()}@example.test`,
      password: await bcrypt.hash('test-password-only', 12),
      roleId: adminRole.id,
    } as User);
    const token = app.get(JwtService).sign({ id: admin.id });
    let createdUserId: number | undefined;
    const payload = {
      cityDepartureId: '88480',
      cityArrivalId: '59582',
      countryDepartureId: '176',
      countryArrivalId: '107',
      hotelId: 'contract-test',
      datesDeparture: ['2027-06-12', '2027-07-14'],
      nightsAmount: 5,
      price: 800,
      currency: 'EUR',
      guests: 2,
      description: 'Integration test tour',
      rating: 4,
    };
    let tour: { id: number; image: string } | undefined;
    try {
      const createdUser = await request(app.getHttpServer())
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: `tour-created-${Date.now()}@example.test`,
          password: 'created-user-password',
        })
        .expect(201);
      createdUserId = createdUser.body.id;
      expect(createdUser.body).toMatchObject({
        id: createdUserId,
        role: 'CLIENT',
      });
      expect(createdUser.body).not.toHaveProperty('password');
      const storedUser = await User.findByPk(createdUserId);
      expect(
        await bcrypt.compare('created-user-password', storedUser.password),
      ).toBe(true);
      const users = await request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(
        users.body.find((user: { id: number }) => user.id === createdUserId),
      ).not.toHaveProperty('password');
      let creation = request(app.getHttpServer())
        .post('/api/tours')
        .set('Authorization', `Bearer ${token}`);
      for (const [key, value] of Object.entries(payload)) {
        creation = creation.field(
          key,
          Array.isArray(value) ? JSON.stringify(value) : String(value),
        );
      }
      const response = await creation
        .attach(
          'image',
          path.resolve(
            __dirname,
            '../../frontend/src/shared/assets/hotels/111.jpg',
          ),
        )
        .expect(201);
      tour = response.body;
      expect(response.body).toMatchObject({
        ...payload,
        cityDeparture: 'Warsaw',
        cityArrival: 'Rome',
      });
      expect(typeof tour.id).toBe('number');
      const detail = await request(app.getHttpServer())
        .get(`/api/tours/${tour.id}`)
        .expect(200);
      expect(detail.body).toEqual(response.body);
      const list = await request(app.getHttpServer())
        .get('/api/tours')
        .expect(200);
      expect(list.body).toContainEqual(detail.body);
      const update = await request(app.getHttpServer())
        .put(`/api/tours/${tour.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ price: 950 })
        .expect(200);
      expect(update.body).toMatchObject({
        id: tour.id,
        price: 950,
        datesDeparture: payload.datesDeparture,
      });
      await request(app.getHttpServer())
        .put(`/api/tours/${tour.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ dates_departure: ['2027-06-01'] })
        .expect(400);
      await request(app.getHttpServer())
        .put(`/api/tours/${tour.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ datesDeparture: ['not-a-date'] })
        .expect(400);
      await request(app.getHttpServer())
        .put(`/api/tours/${tour.id}`)
        .send({ price: 1 })
        .expect(401);
    } finally {
      if (tour) {
        await Tour.destroy({ where: { id: tour.id } });
        await unlink(path.resolve(__dirname, '../uploads', tour.image));
      }
      if (createdUserId) await User.destroy({ where: { id: createdUserId } });
      await admin.destroy();
    }
  });

  it('registers, signs in, validates the current account and never returns password hashes', async () => {
    const email = `tour-client-${Date.now()}@example.test`;
    let userId: number | undefined;
    try {
      const registration = await request(app.getHttpServer())
        .post('/api/auth/registration')
        .send({ email: email.toUpperCase(), password: 'correct horse battery' })
        .expect(201);
      userId = registration.body.user.id;
      expect(registration.body.user).toEqual({
        id: userId,
        email,
        role: 'CLIENT',
      });
      expect(registration.body).not.toHaveProperty('password');
      const stored = await User.findByPk(userId);
      expect(stored.password).not.toBe('correct horse battery');
      expect(
        await bcrypt.compare('correct horse battery', stored.password),
      ).toBe(true);
      await request(app.getHttpServer())
        .post('/api/auth/registration')
        .send({ email, password: 'different password' })
        .expect(409);
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email, password: 'incorrect password' })
        .expect(401);
      const login = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email, password: 'correct horse battery' })
        .expect(201);
      expect(login.body.user).toEqual(registration.body.user);
      const token = login.body.token;
      await request(app.getHttpServer())
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200, registration.body.user);
      await request(app.getHttpServer()).get('/api/auth/me').expect(401);
      await request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);
      const forgedRole = app
        .get(JwtService)
        .sign({ id: userId, role: { name: 'ADMIN' } });
      await request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', `Bearer ${forgedRole}`)
        .expect(403);
      await stored.update({ banned: true });
      await request(app.getHttpServer())
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(401);
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email, password: 'correct horse battery' })
        .expect(401);
    } finally {
      if (userId) await User.destroy({ where: { id: userId } });
    }
  });

  it('creates server-priced reservations and protects reservation ownership', async () => {
    const clientRole = await Role.findOne({ where: { name: 'CLIENT' } });
    const suffix = `${Date.now()}`;
    const firstUser = await User.create({
      email: `reservation-one-${suffix}@example.test`,
      password: await bcrypt.hash('test-password-only', 12),
      roleId: clientRole.id,
    } as User);
    const secondUser = await User.create({
      email: `reservation-two-${suffix}@example.test`,
      password: await bcrypt.hash('test-password-only', 12),
      roleId: clientRole.id,
    } as User);
    const futureDate = (days: number) => {
      const date = new Date();
      date.setUTCDate(date.getUTCDate() + days);
      return date.toISOString().slice(0, 10);
    };
    const departures = [futureDate(180), futureDate(240)];
    const tour = await Tour.create({
      cityDepartureId: '88480',
      cityArrivalId: '59582',
      countryDepartureId: '176',
      countryArrivalId: '107',
      hotelId: 'reservation-test',
      datesDeparture: departures,
      nightsAmount: 6,
      price: 800,
      currency: 'EUR',
      guests: 2,
      description: 'Reservation integration test tour',
      rating: 5,
      image: 'reservation-test.jpg',
    } as Tour);
    const firstToken = app.get(JwtService).sign({ id: firstUser.id });
    const secondToken = app.get(JwtService).sign({ id: secondUser.id });

    try {
      await request(app.getHttpServer()).get('/api/reservations').expect(401);
      await request(app.getHttpServer())
        .post(`/api/reservations/${tour.id}`)
        .set('Authorization', `Bearer ${firstToken}`)
        .send({ departureDate: departures[0], guests: 3, price: 1 })
        .expect(400);

      const firstBooking = await request(app.getHttpServer())
        .post(`/api/reservations/${tour.id}`)
        .set('Authorization', `Bearer ${firstToken}`)
        .send({ departureDate: departures[0], guests: 3 })
        .expect(201);
      expect(firstBooking.body).toMatchObject({
        userId: firstUser.id,
        tourId: tour.id,
        departureDate: departures[0],
        guests: 3,
        nightsAmount: 6,
        price: 1200,
        currency: 'EUR',
        status: 'Booked',
        tour: { id: tour.id, cityDeparture: 'Warsaw', cityArrival: 'Rome' },
      });
      await request(app.getHttpServer())
        .post(`/api/reservations/${tour.id}`)
        .set('Authorization', `Bearer ${firstToken}`)
        .send({ departureDate: departures[0], guests: 3 })
        .expect(409);

      const secondBooking = await request(app.getHttpServer())
        .post(`/api/reservations/${tour.id}`)
        .set('Authorization', `Bearer ${secondToken}`)
        .send({ departureDate: departures[0], guests: 1 })
        .expect(201);
      await request(app.getHttpServer())
        .post(`/api/reservations/${tour.id}`)
        .set('Authorization', `Bearer ${firstToken}`)
        .send({ departureDate: departures[1], guests: 2 })
        .expect(201);

      const mine = await request(app.getHttpServer())
        .get('/api/reservations')
        .set('Authorization', `Bearer ${firstToken}`)
        .expect(200);
      expect(mine.body).toHaveLength(2);
      expect(
        mine.body.every(
          (item: { userId: number }) => item.userId === firstUser.id,
        ),
      ).toBe(true);

      await request(app.getHttpServer())
        .delete(`/api/reservations/${secondBooking.body.id}`)
        .set('Authorization', `Bearer ${firstToken}`)
        .expect(404);
      await request(app.getHttpServer())
        .delete(`/api/reservations/${firstBooking.body.id}`)
        .set('Authorization', `Bearer ${firstToken}`)
        .expect(200);
      const remaining = await request(app.getHttpServer())
        .get('/api/reservations')
        .set('Authorization', `Bearer ${firstToken}`)
        .expect(200);
      expect(remaining.body).toHaveLength(1);
    } finally {
      await UserTour.destroy({ where: { tourId: tour.id } });
      await tour.destroy();
      await firstUser.destroy();
      await secondUser.destroy();
    }
  });
});
