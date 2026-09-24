export function validateEnvironment(config: Record<string, unknown>) {
  const result = { ...config };
  const errors: string[] = [];

  for (const key of ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD']) {
    if (typeof config[key] !== 'string' || !(config[key] as string).trim()) {
      errors.push(`${key} is required`);
    }
  }

  if (
    typeof config.JWT_SECRET !== 'string' ||
    config.JWT_SECRET.trim().length < 32
  ) {
    errors.push('JWT_SECRET must contain at least 32 characters');
  }

  for (const [key, fallback] of [
    ['PORT', 5000],
    ['DB_PORT', 5432],
  ] as const) {
    const value = config[key] === undefined ? fallback : Number(config[key]);
    if (!Number.isInteger(value) || value < 1 || value > 65535) {
      errors.push(`${key} must be an integer between 1 and 65535`);
    } else {
      result[key] = value;
    }
  }

  if (config.CORS_ORIGIN !== undefined) {
    const origins = String(config.CORS_ORIGIN)
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean);
    if (
      !origins.length ||
      origins.some((origin) => {
        try {
          return !['http:', 'https:'].includes(new URL(origin).protocol);
        } catch {
          return true;
        }
      })
    ) {
      errors.push('CORS_ORIGIN must contain comma-separated HTTP(S) origins');
    }
  }

  if (errors.length) {
    // Report names and constraints only: never include submitted credentials.
    throw new Error(`Invalid configuration: ${errors.join('; ')}`);
  }
  return result;
}
