import MegaverseService from './megaverse-service';
import MegaverseClient from './client';
import { MegaverseEntity, MegaverseObjectEntity } from './types';

describe('MegaverseService', () => {
    const candidateId = 'test-candidate-id';
    let megaverseService: MegaverseService;
    let megaverseClient: MegaverseClient;

    beforeEach(() => {
        megaverseClient = new MegaverseClient(candidateId);
        megaverseService = new MegaverseService(megaverseClient);
    });

    it('should create a Polyanet at the specified coordinates', async () => {
        const row = 1;
        const column = 1;
        const entity: MegaverseEntity = 'POLYANET';

        const createPolyanetMock = jest.spyOn(megaverseClient, 'createPolyanet').mockResolvedValue({});

        await megaverseService.createEntity(row, column, entity);

        expect(createPolyanetMock).toHaveBeenCalledWith(row, column);
    });

    it('should create a Soloon at the specified coordinates', async () => {
        const row = 2;
        const column = 2;
        const entity: MegaverseEntity = 'BLUE_SOLOON';

        jest.spyOn(megaverseClient, 'createSoloon').mockResolvedValue({});

        await megaverseService.createEntity(row, column, entity);

        expect(megaverseClient.createSoloon).toHaveBeenCalledWith(row, column, 'blue');
    });

    it('should create a Cometh at the specified coordinates', async () => {
        const row = 3;
        const column = 3;
        const entity: MegaverseEntity = 'UP_COMETH';

        jest.spyOn(megaverseClient, 'createCometh').mockResolvedValue({});

        await megaverseService.createEntity(row, column, entity);

        expect(megaverseClient.createCometh).toHaveBeenCalledWith(row, column, 'up');
    });

    it('should get the goal map', async () => {
        const goalMap = [
            ['SPACE', 'POLYANET'],
            ['POLYANET', 'SPACE']
        ] as MegaverseEntity[][];

        jest.spyOn(megaverseClient, 'getGoalMap').mockResolvedValue({ goal: goalMap });

        const result = await megaverseService.getGoalMap();

        expect(result).toEqual(goalMap);
    });

    it('should get the current map', async () => {
        const currentMap = [
            [null, 'POLYANET'],
            ['POLYANET', null]
        ] as (MegaverseObjectEntity | null)[][];

        jest.spyOn(megaverseClient, 'getCurrentMap').mockResolvedValue({ map: { _id: 'someId', content: currentMap, candidateId: 'someCandidateId', phase: 1, __v: 0 } });

        const result = await megaverseService.getCurrentMap();

        expect(result).toEqual(currentMap);
    });
});
