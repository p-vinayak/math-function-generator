import { MathFunctionGenerator } from './MathFunctionGenerator';
import { DefaultGenerationOptions } from '../entities';
import { MathFunction, NumberRange } from '../entities';
import { random, sample } from 'lodash';

export type TrigonometricFunctionType = 'COS' | 'SIN' | 'TAN' | 'SEC' | 'CSC' | 'COT';

export interface TrigonometricGenerationOptions extends DefaultGenerationOptions {
    type?: TrigonometricFunctionType;
}

export class TrigonometricFunctionGenerator extends MathFunctionGenerator<TrigonometricGenerationOptions> {
    protected mathFunctionType = 'TRIGONOMETRIC';

    public generate({
        randRange = this.getDefaultRandRange(),
        type = this.getRandomSubType(),
    }: TrigonometricGenerationOptions = {}): MathFunction {
        const variances: string[] = this.generateVariances(type, randRange);
        return this.makeMathFunction(variances, type);
    }

    private getRandomSubType(): TrigonometricFunctionType {
        const randomSubTypePool: TrigonometricFunctionType[] = ['COS', 'SIN', 'TAN', 'CSC', 'SEC'];
        const randomSubType: TrigonometricFunctionType = sample(randomSubTypePool);
        return randomSubType;
    }

    private generateVariances(type: string, randRange: NumberRange): string[] {
        type = type.toLowerCase();

        const a: number = random(randRange.min, randRange.max, false);
        const b: number = random(randRange.min, randRange.max, false);
        const c: number = random(randRange.min, randRange.max, false);
        const d: number = random(randRange.min, randRange.max, false);
        const variances: string[] = [
            `y = ${a} * ${type}(${b}x + ${c}) + ${d}`,
            `y = ${a * -1} * ${type}(${b}x + ${c}) + ${d}`,
            `y = ${a} * ${type}(${b}x + ${c * -1}) + ${d}`,
            `y = ${a} * ${type}(${b}x + ${c}/${b}) + ${d}`,
        ];

        return variances;
    }
}
