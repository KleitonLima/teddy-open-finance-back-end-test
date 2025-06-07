import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDeletedInShortenedUrlTable1749310714574
  implements MigrationInterface
{
  name = 'RemoveDeletedInShortenedUrlTable1749310714574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortened_url" DROP COLUMN "deleted"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortened_url" ADD "deleted" boolean NOT NULL DEFAULT false`,
    );
  }
}
