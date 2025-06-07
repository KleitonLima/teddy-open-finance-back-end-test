import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnToShortUrlInShortenedUrl1749256998794
  implements MigrationInterface
{
  name = 'RenameColumnToShortUrlInShortenedUrl1749256998794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortened_url" RENAME COLUMN "shortened_url" TO "short_url"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortened_url" RENAME COLUMN "short_url" TO "shortened_url"`,
    );
  }
}
