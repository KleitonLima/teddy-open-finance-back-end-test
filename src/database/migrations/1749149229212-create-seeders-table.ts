import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedersTable1749149229212 implements MigrationInterface {
  name = 'CreateSeedersTable1749149229212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "seeders" ("id" SERIAL NOT NULL, "timestamp" bigint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c47f92b5ea524850088945b62cf" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "seeders"`);
  }
}
