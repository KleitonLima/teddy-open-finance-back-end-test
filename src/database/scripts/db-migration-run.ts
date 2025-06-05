import { AppDataSource } from 'src/database/config/typeorm.db';

async function run() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
}

run()
  .catch(console.error)
  .finally(() => process.exit());
