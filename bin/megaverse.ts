import MegaverseClient from '../src/client';
import MegaverseService from '../src/megaverse-service';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'process';

// Set up command-line argument parsing
const argv = yargs(hideBin(process.argv)).option('candidate-id', {
    type: 'string',
    demandOption: true,
    describe: 'The candidate ID to use for the MegaverseClient'
}).argv;

// Extract the candidate ID from command-line arguments
const candidateId = (argv as any)['candidate-id'];

const main = async () => {
    const megaverseService = new MegaverseService(new MegaverseClient(candidateId));

    let goalMap, currentMap;
    try {
        [goalMap, currentMap] = await Promise.all([
            megaverseService.getGoalMap(),
            megaverseService.getCurrentMap()
        ]);
    } catch (error) {
        console.error("Failed to get maps:", error);
        return;
    }

    const mapSize = goalMap.length;
    const entitiesToCreate = [];

    // Compare goal map with current map to identify missing entities. current map is used to check if the entity is already present.
    // This is to avoid recreating entities that are already present in the case the script fails in the middle of execution and is run again.
    for (let row = 0; row < mapSize; row++) {
        for (let col = 0; col < mapSize; col++) {
            const goalEntity = goalMap[row][col];
            const currentEntity = currentMap[row][col];

            if (goalEntity !== 'SPACE') {
                // Check for missing or mismatched POLYANET
                if (goalEntity === 'POLYANET' && (!currentEntity || currentEntity.type !== 0)) {
                    entitiesToCreate.push({ row, col, type: goalEntity });
                } 
                // Check for missing or mismatched SOLOON
                else if (goalEntity.includes('SOLOON') && (!currentEntity || currentEntity.type !== 1 || currentEntity.color !== goalEntity.split('_')[0].toLowerCase())) {
                    entitiesToCreate.push({ row, col, type: goalEntity });
                } 
                // Check for missing or mismatched COMETH
                else if (goalEntity.includes('COMETH') && (!currentEntity || currentEntity.type !== 2 || currentEntity.direction !== goalEntity.split('_')[0].toLowerCase())) {
                    entitiesToCreate.push({ row, col, type: goalEntity });
                }
            }
        }
    }

    console.log(`Found ${entitiesToCreate.length} missing entities to create`);

    // Create missing entities
    for (const entity of entitiesToCreate) {
        await megaverseService.createEntity(entity.row, entity.col, entity.type);
        // Sleep for 3 seconds to avoid overwhelming the API with requests - HTTP 429 Too Many Requests error
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log('Finished creating missing entities');
}

// Execute the main function
main();
