import { DataSource, DataSourceOptions } from 'typeorm';
import { ENVCONFIG } from '../config/env.config';
import { TypeOrmSubscriber } from './subscribe-typeorm.db';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: ENVCONFIG.DATABASE_URL,
  entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../../database/migrations/*{.ts,.js}`],
  subscribers: [TypeOrmSubscriber],
  multipleStatements: true,
  dateStrings: true,
  migrationsTransactionMode: 'all',
  extra: {
    waitForConnections: true,
    connectionLimit: 99,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  },
} as DataSourceOptions);
