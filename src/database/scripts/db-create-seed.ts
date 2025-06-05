import { format } from 'date-fns';
import * as fs from 'fs';
import * as path from 'path';
import { toKebabCase, toPascalCase } from 'src/utils/to-case';
import { QueryRunner } from 'typeorm';
import * as yargs from 'yargs';

export interface SeedInterface {
  name: string;
  up(queryRunner: QueryRunner): Promise<any>;
}

export async function run() {
  const argv = await yargs.option('name', {
    alias: 'n',
    description: 'Name of the seed',
    type: 'string',
    demandOption: true,
  }).argv;

  const seedName = argv.name;

  const timestamp = format(new Date(), 'yyyyMMddHHmmss');
  const fileNameKebabCase = `${timestamp}-${toKebabCase(seedName)}.ts`;
  const fileNamePascalCase = `${toPascalCase(seedName)}${timestamp}`;
  const filePath = path.resolve(
    __dirname,
    '..',
    'seeds',
    `${fileNameKebabCase}`,
  );

  const seedContent = `import { QueryRunner } from 'typeorm'

export const ${fileNamePascalCase}Seed = {
  name: '${fileNamePascalCase}',
  async up(queryRunner: QueryRunner): Promise<any> {
    // Your seed logic here
  }
};
`;
  fs.writeFileSync(filePath, seedContent);
  console.log(`Seed file created: ${fileNameKebabCase}`);
}

run().catch(console.error);
