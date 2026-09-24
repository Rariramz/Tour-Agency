import { validateEnvironment } from './environment';

const valid = {
  DB_HOST: '127.0.0.1',
  DB_NAME: 'test',
  DB_USER: 'test',
  DB_PASSWORD: 'test-only-password',
  JWT_SECRET: 'test-only-secret-with-at-least-32-characters',
};

describe('startup configuration', () => {
  it('accepts credentials and converts configured ports', () => {
    expect(validateEnvironment({ ...valid, DB_PORT: '55432' })).toMatchObject({
      DB_PORT: 55432,
      PORT: 5000,
    });
  });

  it.each(['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'])(
    'rejects a missing %s',
    (key) => {
      expect(() => validateEnvironment({ ...valid, [key]: undefined })).toThrow(
        key,
      );
    },
  );

  it('does not accept the historical JWT fallback or reveal its value', () => {
    expect(() =>
      validateEnvironment({ ...valid, JWT_SECRET: 'SECRET' }),
    ).toThrow('JWT_SECRET must contain at least 32 characters');
  });

  it('accepts explicit HTTP origins and rejects malformed CORS configuration', () => {
    expect(
      validateEnvironment({
        ...valid,
        CORS_ORIGIN: 'https://portfolio.example, http://localhost:7001',
      }),
    ).toMatchObject({
      CORS_ORIGIN: 'https://portfolio.example, http://localhost:7001',
    });
    expect(() => validateEnvironment({ ...valid, CORS_ORIGIN: '*' })).toThrow(
      'CORS_ORIGIN',
    );
  });

  it.each(['', 'invalid', '0', '65536', '5432.5'])(
    'rejects invalid database port %p',
    (port) => {
      expect(() => validateEnvironment({ ...valid, DB_PORT: port })).toThrow(
        'DB_PORT',
      );
    },
  );

  it('never includes credential values in validation errors', () => {
    try {
      validateEnvironment({ ...valid, JWT_SECRET: 'sensitive-short-value' });
      throw new Error('Expected invalid configuration to be rejected');
    } catch (error) {
      expect(error.message).toContain('Invalid configuration');
      expect(error.message).not.toContain('sensitive-short-value');
      expect(error.message).not.toContain(valid.DB_PASSWORD);
    }
  });
});
