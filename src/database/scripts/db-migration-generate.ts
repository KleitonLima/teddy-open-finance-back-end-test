import { exec } from 'child_process';
import * as yargs from 'yargs';

async function run() {
    const argv = await yargs.option('name', {
        alias: 'n',
        description: 'Name of the seed',
        type: 'string',
        demandOption: true,
    }).argv;

    const migrationName = argv.name;

    exec(
        `typeorm-ts-node-commonjs -d ./src/database/config/typeorm.db.ts migration:generate ./src/database/migrations/${migrationName}`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        },
    );
}

run().catch(console.error);
