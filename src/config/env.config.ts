import 'dotenv/config';

const env = process.env;

export const ENVCONFIG = {
  PORT: env.PORT ?? 3000,
  DATABASE_URL: env.DATABASE_URL,
  PASS_SALT: env.PASS_SALT ?? 10,
  JWT_SECRET: env.JWT_SECRET ?? 'jwt-secret',
  JWT_EXPIRATION: env.JWT_EXPIRATION ?? '10m',
};
