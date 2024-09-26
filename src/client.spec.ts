import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MegaverseClient from './client';
import { MegaverseObjectEntity } from './types';

describe('MegaverseClient', () => {
    let mock: MockAdapter;
    let client: MegaverseClient;
    const candidateId = 'test-candidate-id';

    beforeEach(() => {
        mock = new MockAdapter(axios);
        client = new MegaverseClient(candidateId);
    });

    afterEach(() => {
        mock.restore();
    });

    describe('createPolyanet', () => {
        it('should create a polyanet successfully', async () => {
            const row = 1;
            const column = 2;
            const responseData = { success: true };

            mock.onPost(`${client['baseUrl']}/polyanets`).reply(200, responseData);

            const result = await client.createPolyanet(row, column);

            expect(result).toEqual(responseData);
        });

        it('should throw an error if creation fails', async () => {
            const row = 1;
            const column = 2;
            const errorMessage = 'Request failed with status code 500';

            mock.onPost(`${client['baseUrl']}/polyanets`).reply(500);

            await expect(client.createPolyanet(row, column)).rejects.toThrow(`Unable to create polyanet: ${errorMessage}`);
        });
    });

    describe('deletePolyanet', () => {
        it('should delete a polyanet successfully', async () => {
            const row = 1;
            const column = 2;
            const responseData = { success: true };

            mock.onDelete(`${client['baseUrl']}/polyanets`).reply(200, responseData);

            const result = await client.deletePolyanet(row, column);

            expect(result).toEqual(responseData);
        });

        it('should throw an error if deletion fails', async () => {
            const row = 1;
            const column = 2;
            const errorMessage = 'Request failed with status code 500';

            mock.onDelete(`${client['baseUrl']}/polyanets`).reply(500);

            await expect(client.deletePolyanet(row, column)).rejects.toThrow(`Unable to delete polyanet: ${errorMessage}`);
        });
    });

    describe('createSoloon', () => {
        it('should create a soloon successfully', async () => {
            const row = 3;
            const column = 4;
            const color = 'blue';
            const responseData = { success: true };

            mock.onPost(`${client['baseUrl']}/soloons`, { row, column, color, candidateId: client['candidateId'] }).reply(200, responseData);

            const result = await client.createSoloon(row, column, color);

            expect(result).toEqual(responseData);
        });

        it('should throw an error if creation fails', async () => {
            const row = 3;
            const column = 4;
            const color = 'blue';
            const errorMessage = 'Request failed with status code 500';

            mock.onPost(`${client['baseUrl']}/soloons`, { row, column, color, candidateId: client['candidateId'] }).reply(500);

            await expect(client.createSoloon(row, column, color)).rejects.toThrow(`Unable to create soloon: ${errorMessage}`);
        });
    });

    describe('deleteSoloon', () => {
        it('should delete a soloon successfully', async () => {
            const row = 3;
            const column = 4;
            const responseData = { success: true };

            mock.onDelete(`${client['baseUrl']}/soloons`, { data: { row, column, candidateId: client['candidateId'] } }).reply(200, responseData);

            const result = await client.deleteSoloon(row, column);

            expect(result).toEqual(responseData);
        });

        it('should throw an error if deletion fails', async () => {
            const row = 3;
            const column = 4;
            const errorMessage = 'Request failed with status code 500';

            mock.onDelete(`${client['baseUrl']}/soloons`, { data: { row, column, candidateId: client['candidateId'] } }).reply(500);

            await expect(client.deleteSoloon(row, column)).rejects.toThrow(`Unable to delete soloon: ${errorMessage}`);
        });
    });

    describe('createCometh', () => {
        it('should create a cometh successfully', async () => {
            const row = 5;
            const column = 6;
            const direction = 'up';
            const responseData = { success: true };

            mock.onPost(`${client['baseUrl']}/comeths`, { row, column, direction, candidateId: client['candidateId'] }).reply(200, responseData);

            const result = await client.createCometh(row, column, direction);

            expect(result).toEqual(responseData);
        });

        it('should throw an error if creation fails', async () => {
            const row = 5;
            const column = 6;
            const direction = 'up';
            const errorMessage = 'Request failed with status code 500';

            mock.onPost(`${client['baseUrl']}/comeths`, { row, column, direction, candidateId: client['candidateId'] }).reply(500);

            await expect(client.createCometh(row, column, direction)).rejects.toThrow(`Unable to create cometh: ${errorMessage}`);
        });
    });

    describe('deleteCometh', () => {
        it('should delete a cometh successfully', async () => {
            const row = 5;
            const column = 6;
            const responseData = { success: true };

            mock.onDelete(`${client['baseUrl']}/comeths`, { data: { row, column, candidateId: client['candidateId'] } }).reply(200, responseData);

            const result = await client.deleteCometh(row, column);

            expect(result).toEqual(responseData);
        });

        it('should throw an error if deletion fails', async () => {
            const row = 5;
            const column = 6;
            const errorMessage = 'Request failed with status code 500';

            mock.onDelete(`${client['baseUrl']}/comeths`, { data: { row, column, candidateId: client['candidateId'] } }).reply(500);

            await expect(client.deleteCometh(row, column)).rejects.toThrow(`Unable to delete cometh: ${errorMessage}`);
        });
    });

    describe('getGoalMap', () => {
        it('should get the goal map successfully', async () => {
            const goalMap = [
                ['SPACE', 'POLYANET'],
                ['POLYANET', 'SPACE']
            ];
            const responseData = { goal: goalMap };

            mock.onGet(`${client['baseUrl']}/map/${client['candidateId']}/goal`).reply(200, responseData);

            const result = await client.getGoalMap();

            expect(result).toEqual(responseData);
        });

        it('should throw an error if fetching goal map fails', async () => {
            const errorMessage = 'Request failed with status code 500';

            mock.onGet(`${client['baseUrl']}/map/${client['candidateId']}/goal`).reply(500);

            await expect(client.getGoalMap()).rejects.toThrow(`Unable to retrieve goal map: ${errorMessage}`);
        });
    });

    describe('getCurrentMap', () => {
        it('should get the current map successfully', async () => {
            const currentMap: (null | MegaverseObjectEntity)[][] = [
                [{ type: 0 }, { type: 1, color: 'blue' }],
                [{ type: 1, color: 'red' }, { type: 0 }]
            ];
            const responseData = { map: { _id: 'someId', content: currentMap, candidateId: 'someCandidateId', phase: 1, __v: 0 } };

            mock.onGet(`${client['baseUrl']}/map/${client['candidateId']}`).reply(200, responseData);

            const result = await client.getCurrentMap();

            expect(result).toEqual(responseData);
        });

        it('should throw an error if fetching current map fails', async () => {
            const errorMessage = 'Request failed with status code 500';

            mock.onGet(`${client['baseUrl']}/map/${client['candidateId']}`).reply(500);

            await expect(client.getCurrentMap()).rejects.toThrow(`Unable to retrieve current map: ${errorMessage}`);
        });
    });
});
