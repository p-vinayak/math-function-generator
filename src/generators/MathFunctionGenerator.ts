import { DefaultGenerationOptions, MathFunction, NumberRange } from '../entities';
import { sanitizeMathFunctionString } from '../utils';
import { sample } from 'lodash';

export abstract class MathFunctionGenerator<T extends DefaultGenerationOptions> {
    private defaultRandRange: NumberRange = { min: 1, max: 10 };

    protected abstract mathFunctionType: string;
    public abstract generate(options?: T): MathFunction;

    public getDefaultRandRange(): NumberRange {
        return this.defaultRandRange;
    }

    public setDefaultRandRange(randRange: NumberRange): void {
        this.defaultRandRange = randRange;
    }

    protected makeMathFunction(variances: string[], subType: string | undefined): MathFunction {
        const sanitizedVariances: string[] = sanitizeMathFunctionString(variances);
        const functionString: string = sample(sanitizedVariances);
        const type: string = this.mathFunctionType;
        const mathFunction: MathFunction = {
            functionString: functionString,
            functionVariances: sanitizedVariances,
            type: type,
            subType: subType,
        };
        return mathFunction;
    }
}
