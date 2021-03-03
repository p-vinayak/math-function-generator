import { DefaultGenerationOptions } from '../../entities';

export interface TrigonometricGenerationOptions extends DefaultGenerationOptions {
    type?: TrignometricFunctionType;
}

export type TrignometricFunctionType = 'COS' | 'SIN' | 'TAN' | 'COT' | 'SEC' | 'CSC';
