import { MathFunctionGenerator } from '../MathFunctionGenerator';
import { MathFunction, NumberRange, DefaultGenerationOptions } from '../../entities';
import { random } from 'lodash';

export class LinearFunctionGenerator extends MathFunctionGenerator<DefaultGenerationOptions> {
    protected mathFunctionType = 'LINEAR';

    public generate({ randRange = this.getDefaultRandRange() }: DefaultGenerationOptions = {}): MathFunction {
        const variances: string[] = this.generateVariances(randRange);
        return this.makeMathFunction(variances);
    }

    private generateVariances(randRange: NumberRange): string[] {
        const m: number = random(randRange.min, randRange.max, false);
        const b: number = random(randRange.min, randRange.max, false);
        const variances: string[] = [
            `y = ${m}x + ${b}`,
            `y = ${m}x + ${b * -1}`,
            `y = ${m * -1}x + ${b}`,
            `y = ${m * -1}x - ${b * -1}`,
        ];
        return variances;
    }
}
