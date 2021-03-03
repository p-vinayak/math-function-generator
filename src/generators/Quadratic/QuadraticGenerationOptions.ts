import { DefaultGenerationOptions } from '../../entities';

export interface QuadraticGenerationOptions extends DefaultGenerationOptions {
    format?: QuadraticFunctionTypes;
}

export type QuadraticFunctionTypes = 'STANDARD' | 'VERTEX' | 'FACTORED';
