import { DefaultGenerationOptions, MathFunction, NumberRange } from '../entities';
import { sanitizeMathFunctionString } from '../utils';
import { sample } from 'lodash';

export abstract class MathFunctionGenerator<T extends DefaultGenerationOptions> {
    private defaultRandRange: NumberRange = { min: 1, max: 10 };
    protected mathFunctionSubType: string | undefined = undefined;

    protected abstract mathFunctionType: string;
    public abstract generate(options?: T): MathFunction;

    public getDefaultRandRange(): NumberRange {
        return this.defaultRandRange;
    }

    protected getType(): string {
        return this.mathFunctionType;
    }

    protected getSubType(): string {
        return this.mathFunctionSubType;
    }

    public setDefaultRandRange(randRange: NumberRange): void {
        this.defaultRandRange = randRange;
    }

    protected setType(type: string): void {
        this.mathFunctionType = type;
    }

    protected setSubType(subType: string): void {
        this.mathFunctionSubType = subType;
    }

    protected makeMathFunction(variances: string[]): MathFunction {
        const sanitizedVariances: string[] = sanitizeMathFunctionString(variances);
        const functionString: string = sample(sanitizedVariances);
        const type: string = this.mathFunctionType;
        const subType: string = this.mathFunctionSubType;
        const mathFunction: MathFunction = {
            functionString: functionString,
            functionVariances: sanitizedVariances,
            type: type,
            subType: subType,
        };
        return mathFunction;
    }
}
