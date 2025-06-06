import 'dotenv/config';

const env = process.env;

export const ENVCONFIG = {
  PORT: env.PORT ?? 3000,
  DATABASE_URL: env.DATABASE_URL,
  PASS_SALT: env.PASS_SALT ?? 10,
};
