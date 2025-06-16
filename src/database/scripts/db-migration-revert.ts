import { AppDataSource } from 'src/database/typeorm.db';

async function run() {
  await AppDataSource.initialize();
  await AppDataSource.undoLastMigration();
}

run()
  .catch(console.error)
  .finally(() => process.exit());
