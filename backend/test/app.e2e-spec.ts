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

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
  });

  it('can read tours from the configured database', async () => {
    const response = await request(app.getHttpServer()).get('/api/tours').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('does not allow anonymous access to the user list', () => {
    return request(app.getHttpServer()).get('/api/users').expect(403);
  });

  it('returns useful errors for invalid and missing tour IDs', async () => {
    await request(app.getHttpServer()).get('/api/tours/not-a-number').expect(400);
    await request(app.getHttpServer()).get('/api/tours/2147483647').expect(404);
  });

  it('preserves multipart departure dates and exposes the same contract for list, detail and update', async () => {
    const token = app.get(JwtService).sign({ id: -1, role: { name: 'ADMIN' } });
    const payload = {
      cityDepartureId: '88480', cityArrivalId: '59582',
      countryDepartureId: '176', countryArrivalId: '107', hotelId: 'contract-test',
      datesDeparture: ['2027-06-12', '2027-07-14'], nightsAmount: 5,
      price: 800, currency: 'EUR', guests: 2, description: 'Integration test tour', rating: 4,
    };
    let tour: { id: number; image: string } | undefined;
    try {
      let creation = request(app.getHttpServer()).post('/api/tours').set('Authorization', `Bearer ${token}`);
      for (const [key, value] of Object.entries(payload)) {
        creation = creation.field(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
      }
      const response = await creation.attach('image', path.resolve(__dirname, '../../frontend/src/shared/assets/hotels/111.jpg')).expect(201);
      tour = response.body;
      expect(response.body).toMatchObject({ ...payload, cityDeparture: 'Warsaw', cityArrival: 'Rome' });
      expect(typeof tour.id).toBe('number');
      const detail = await request(app.getHttpServer()).get(`/api/tours/${tour.id}`).expect(200);
      expect(detail.body).toEqual(response.body);
      const list = await request(app.getHttpServer()).get('/api/tours').expect(200);
      expect(list.body).toContainEqual(detail.body);
      const update = await request(app.getHttpServer()).put(`/api/tours/${tour.id}`)
        .set('Authorization', `Bearer ${token}`).send({ price: 950 }).expect(200);
      expect(update.body).toMatchObject({ id: tour.id, price: 950, datesDeparture: payload.datesDeparture });
      await request(app.getHttpServer()).put(`/api/tours/${tour.id}`)
        .set('Authorization', `Bearer ${token}`).send({ dates_departure: ['2027-06-01'] }).expect(400);
      await request(app.getHttpServer()).put(`/api/tours/${tour.id}`)
        .set('Authorization', `Bearer ${token}`).send({ datesDeparture: ['not-a-date'] }).expect(400);
      await request(app.getHttpServer()).put(`/api/tours/${tour.id}`).send({ price: 1 }).expect(403);
    } finally {
      if (tour) {
        await Tour.destroy({ where: { id: tour.id } });
        await unlink(path.resolve(__dirname, '../uploads', tour.image));
      }
    }
  });
});
