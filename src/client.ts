import axios from 'axios';
import { ComethDirection, MegaverseEntity, MegaverseObjectEntity, SoloonColor } from './types';

/**
 * MegaverseClient class provides methods to interact with the Megaverse API.
 * It encapsulates the functionality for creating, deleting, and retrieving various astral objects
 * such as Polyanets, Soloons, and Comeths, as well as the goal and current maps.
 */
export default class MegaverseClient {
  private baseUrl: string = 'https://challenge.crossmint.io/api';
  private candidateId: string;

  /**
   * Creates a new instance of MegaverseClient.
   * @param candidateId The unique identifier for the candidate interacting with the Megaverse.
   */
  constructor(candidateId: string) {
    this.candidateId = candidateId;
  }

  /**
   * Creates a Polyanet at the specified coordinates.
   * @param row The row coordinate of the Polyanet.
   * @param column The column coordinate of the Polyanet.
   * @returns A promise that resolves when the Polyanet is created.
   */
  async createPolyanet(row: number, column: number): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/polyanets`, {
        row,
        column,
        candidateId: this.candidateId
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Unable to create polyanet: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Deletes a Polyanet at the specified coordinates.
   * @param row The row coordinate of the Polyanet to delete.
   * @param column The column coordinate of the Polyanet to delete.
   * @returns A promise that resolves when the Polyanet is deleted.
   */
  async deletePolyanet(row: number, column: number): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/polyanets`, {
        data: {
          row,
          column,
          candidateId: this.candidateId
        }
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Unable to delete polyanet: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Creates a Soloon at the specified coordinates with the given color.
   * @param row The row coordinate of the Soloon.
   * @param column The column coordinate of the Soloon.
   * @param color The color of the Soloon.
   * @returns A promise that resolves when the Soloon is created.
   */
  async createSoloon(row: number, column: number, color: SoloonColor): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/soloons`, {
        row,
        column,
        color,
        candidateId: this.candidateId
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Unable to create soloon: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Deletes a Soloon at the specified coordinates.
   * @param row The row coordinate of the Soloon to delete.
   * @param column The column coordinate of the Soloon to delete.
   * @returns A promise that resolves when the Soloon is deleted.
   */
  async deleteSoloon(row: number, column: number): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/soloons`, {
        data: {
          row,
          column,
          candidateId: this.candidateId
        }
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Unable to delete soloon: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Creates a Cometh at the specified coordinates with the given direction.
   * @param row The row coordinate of the Cometh.
   * @param column The column coordinate of the Cometh.
   * @param direction The direction the Cometh is facing.
   * @returns A promise that resolves when the Cometh is created.
   */
  async createCometh(row: number, column: number, direction: ComethDirection): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/comeths`, {
        row,
        column,
        direction,
        candidateId: this.candidateId
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Unable to create cometh: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Deletes a Cometh at the specified coordinates.
   * @param row The row coordinate of the Cometh to delete.
   * @param column The column coordinate of the Cometh to delete.
   * @returns A promise that resolves when the Cometh is deleted.
   */
  async deleteCometh(row: number, column: number): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/comeths`, {
        data: {
          row,
          column,
          candidateId: this.candidateId
        }
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Unable to delete cometh: ${error.message}`);
      }
      throw error;
    }
  }
  
  /**
   * Retrieves the goal map for the Megaverse challenge.
   * @returns A promise that resolves to an object containing the goal map.
   */
  async getGoalMap(): Promise<{ goal: (MegaverseEntity)[][] }> {
    try {
      const response = await axios.get(`${this.baseUrl}/map/${this.candidateId}/goal`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Unable to retrieve goal map: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Retrieves the current map with its content.
   * @returns A promise that resolves to an object containing the current map data.
   */
  async getCurrentMap(): Promise<{
    map: {
      _id: string;
      content: (null | MegaverseObjectEntity)[][];
      candidateId: string;
      phase: number;
      __v: number;
    }
  }> {
    try {
      const response = await axios.get(`${this.baseUrl}/map/${this.candidateId}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Unable to retrieve current map: ${error.message}`);
      }
      throw error;
    }
  }
}