import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrateShortenedUrlTable1749151406644 implements MigrationInterface {
  name = 'CrateShortenedUrlTable1749151406644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shortened_url" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_url" character varying NOT NULL, "shortened_url" character varying NOT NULL, "accesses" integer NOT NULL DEFAULT '0', "deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_786934fb957b601fcf913b24f04" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "shortened_url"`);
  }
}
