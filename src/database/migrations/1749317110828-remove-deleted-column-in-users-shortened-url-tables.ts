import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDeletedColumnInUsersShortenedUrlTables1749317110828
  implements MigrationInterface
{
  name = 'RemoveDeletedColumnInUsersShortenedUrlTables1749317110828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
    await queryRunner.query(
      `ALTER TABLE "shortened_url" DROP COLUMN "deleted"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortened_url" ADD "deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "deleted" boolean NOT NULL DEFAULT false`,
    );
  }
}
