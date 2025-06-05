import { AppDataSource } from './typeorm.db';

export const setupDbConnection = async () => {
  try {
    console.info('Connecting to database...');
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    console.info('Database connected successfully');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to connect database', error.message);
    } else {
      console.error('Failed to connect database', error);
    }
    throw error;
  }
};
