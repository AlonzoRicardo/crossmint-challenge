import MegaverseClient from './client';
import { ComethDirection, ComethEntity, MegaverseEntity, MegaverseObjectEntity, SoloonColor, SoloonEntity } from './types';

/**
 * MegaverseService class provides methods to interact with the Megaverse API.
 * It encapsulates the functionality for creating and managing various astral objects
 * such as Polyanets, Soloons, and Comeths.
 */
export default class MegaverseService {
    private client: MegaverseClient;

    /**
     * Creates a new instance of MegaverseService.
     * @param client An instance of MegaverseClient.
     */
    constructor(client: MegaverseClient) {
        this.client = client;
    }

    /**
     * Creates an entity at the specified coordinates based on its type.
     * @param row The row coordinate of the entity.
     * @param column The column coordinate of the entity.
     * @param type The type of the entity to create.
     * @returns A promise that resolves when the entity is created.
     */
    async createEntity(row: number, column: number, type: MegaverseEntity): Promise<void> {
        try {
            if (type === 'POLYANET') {
                await this.createPolyanet(row, column);
            } else if (type.endsWith('_SOLOON')) {
                await this.createSoloon(row, column, type as SoloonEntity);
            } else if (type.endsWith('_COMETH')) {
                await this.createCometh(row, column, type as ComethEntity);
            } else {
                throw new Error(`Unknown entity type: ${type}`);
            }
            console.log(`Created ${type} at (${row}, ${column})`);
        } catch (error) {
            console.error(`Failed to create entity at (${row}, ${column}):`, error);
            throw error;
        }
    }

    /**
     * Creates a single Polyanet at the specified coordinates.
     * @param row The row coordinate of the Polyanet.
     * @param column The column coordinate of the Polyanet.
     * @returns A promise that resolves when the Polyanet is created.
     */
    async createPolyanet(row: number, column: number): Promise<void> {
        return this.client.createPolyanet(row, column);
    }

    /**
     * Creates multiple Polyanets at the specified coordinates.
     * @param targets An array of objects containing row and column coordinates for each Polyanet.
     * @returns A promise that resolves to an array of failed creation attempts.
     */
    async createPolyanets(targets: { row: number; col: number; }[]): Promise<{ row: number; col: number; }[]> {
        const failedAttempts = [];
        for (const target of targets) {
            try {
                await this.createPolyanet(target.row, target.col);
                console.log(`Created polyanet at (${target.row}, ${target.col})`);
            } catch (error) {
                console.error(`Failed to create polyanet at (${target.row}, ${target.col}):`, error);
                failedAttempts.push(target);
            }
        }
        return failedAttempts;
    }

    /**
     * Deletes a Polyanet at the specified coordinates.
     * @param row The row coordinate of the Polyanet to delete.
     * @param column The column coordinate of the Polyanet to delete.
     * @returns A promise that resolves when the Polyanet is deleted.
     */
    async deletePolyanet(row: number, column: number): Promise<void> {
        return this.client.deletePolyanet(row, column);
    }

    /**
     * Creates a Soloon at the specified coordinates with the given color.
     * @param row The row coordinate of the Soloon.
     * @param column The column coordinate of the Soloon.
     * @param color The color of the Soloon.
     * @returns A promise that resolves when the Soloon is created.
     */
    async createSoloon(row: number, column: number, soloon: SoloonEntity): Promise<void> {
        const color = soloon.split('_')[0].toLowerCase() as SoloonColor;
        return this.client.createSoloon(row, column, color);
    }

    /**
     * Deletes a Soloon at the specified coordinates.
     * @param row The row coordinate of the Soloon to delete.
     * @param column The column coordinate of the Soloon to delete.
     * @returns A promise that resolves when the Soloon is deleted.
     */
    async deleteSoloon(row: number, column: number): Promise<void> {
        return this.client.deleteSoloon(row, column);
    }

    /**
     * Creates a Cometh at the specified coordinates with the given direction.
     * @param row The row coordinate of the Cometh.
     * @param column The column coordinate of the Cometh.
     * @param direction The direction the Cometh is facing.
     * @returns A promise that resolves when the Cometh is created.
     */
    async createCometh(row: number, column: number, cometh: ComethEntity): Promise<void> {
        const direction = cometh.split('_')[0].toLowerCase() as ComethDirection;
        return this.client.createCometh(row, column, direction);
    }

    /**
     * Deletes a Cometh at the specified coordinates.
     * @param row The row coordinate of the Cometh to delete.
     * @param column The column coordinate of the Cometh to delete.
     * @returns A promise that resolves when the Cometh is deleted.
     */
    async deleteCometh(row: number, column: number): Promise<void> {
        return this.client.deleteCometh(row, column);
    }

    /**
     * Retrieves the goal map for the Megaverse challenge.
     * @returns A promise that resolves to a 2D array representing the goal map.
     */
    async getGoalMap(): Promise<(MegaverseEntity)[][]> {
        return (await this.client.getGoalMap()).goal;
    }

    /**
     * Returns the current map with its content.
     * @returns A promise that resolves to the current map data.
     */
    async getCurrentMap(): Promise<(null | MegaverseObjectEntity)[][]> {
        return (await this.client.getCurrentMap()).map.content;
    }
}