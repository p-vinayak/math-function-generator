import { TrigonometricGenerationOptions } from './TrigonometricGenerationOptions';
import { MathFunctionGenerator } from '../MathFunctionGenerator';
import { MathFunction, NumberRange } from '../../entities';
import { random } from 'lodash';

export class TrigonometricFunctionGenerator extends MathFunctionGenerator<TrigonometricGenerationOptions> {
    protected mathFunctionType = 'TRIGONOMETRIC';

    public generate({
        randRange = this.getDefaultRandRange(),
        type = 'SIN',
    }: TrigonometricGenerationOptions = {}): MathFunction {
        const variances: string[] = this.generateVariances(type, randRange);
        return this.makeMathFunction(variances);
    }

    private generateVariances(type: string, randRange: NumberRange): string[] {
        this.setSubType(type.toUpperCase());
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
