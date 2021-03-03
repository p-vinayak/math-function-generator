import { DefaultGenerationOptions } from '../../entities';

export interface QuadraticGenerationOptions extends DefaultGenerationOptions {
    format?: QuadraticFunctionType;
}

export type QuadraticFunctionType = 'STANDARD' | 'VERTEX' | 'FACTORED';
