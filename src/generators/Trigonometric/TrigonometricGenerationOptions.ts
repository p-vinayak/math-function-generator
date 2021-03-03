import { DefaultGenerationOptions } from '../../entities';

export interface TrigonometricGenerationOptions extends DefaultGenerationOptions {
    type?: TrignometricFunctionTypes;
}

export type TrignometricFunctionTypes = 'COS' | 'SIN' | 'TAN' | 'COT' | 'SEC' | 'CSC';
