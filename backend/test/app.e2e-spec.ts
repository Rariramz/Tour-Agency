import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE_PROVIDER } from '../src/constants';

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
});
