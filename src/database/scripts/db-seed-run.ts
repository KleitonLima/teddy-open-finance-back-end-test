import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { SeedInterface } from './db-create-seed';
import { AppDataSource } from '../typeorm.db';
import { Seeder } from '../seeder.entity';

async function run() {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const seedRepository = AppDataSource.getRepository(Seeder);

    const seedsFolder = path.resolve(__dirname, '..', 'seeds');

    const seedsFiles = fs
      .readdirSync(seedsFolder)
      .filter((file) => file.endsWith('.ts') && file !== 'seedRun.ts');

    for (const seedFile of seedsFiles) {
      const importedModule = (await import(
        path.join(seedsFolder, seedFile)
      )) as { [key: string]: unknown };
      const seedModule = Object.values(importedModule)[0] as SeedInterface;

      if (await seedNotExecuted(seedRepository, seedModule.name)) {
        await seedModule.up(queryRunner);
        await seedRepository.insert({
          name: seedModule.name,
          timestamp: Date.now(),
        });
        console.log(`${seedModule.name} executed!`);
      }
    }

    await queryRunner.commitTransaction();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
}

async function seedNotExecuted(
  seedRepository: Repository<Seeder>,
  seedName: string,
): Promise<boolean> {
  const existingSeed = await seedRepository.findOne({
    where: { name: seedName },
  });
  return !existingSeed;
}

run()
  .catch(console.error)
  .finally(() => process.exit());
