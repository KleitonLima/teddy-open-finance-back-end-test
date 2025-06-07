import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetRelationUserNullableInShortendUrlTable1749259592302
  implements MigrationInterface
{
  name = 'SetRelationUserNullableInShortendUrlTable1749259592302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortened_url" DROP CONSTRAINT "FK_d46d9d62bfc08f05fe00b444ba1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shortened_url" ALTER COLUMN "userId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shortened_url" ADD CONSTRAINT "FK_d46d9d62bfc08f05fe00b444ba1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shortened_url" DROP CONSTRAINT "FK_d46d9d62bfc08f05fe00b444ba1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shortened_url" ALTER COLUMN "userId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shortened_url" ADD CONSTRAINT "FK_d46d9d62bfc08f05fe00b444ba1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
