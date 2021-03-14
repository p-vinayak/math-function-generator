import { MathFunction, NumberRange } from '../entities';
import { DefaultGenerationOptions } from '../entities';
import { MathFunctionGenerator } from './MathFunctionGenerator';
import { random, sample } from 'lodash';

export type QuadraticFunctionType = 'STANDARD' | 'VERTEX' | 'FACTORED';

export interface QuadraticGenerationOptions extends DefaultGenerationOptions {
    format?: QuadraticFunctionType;
}

export class QuadraticFunctionGenerator extends MathFunctionGenerator<QuadraticGenerationOptions> {
    protected mathFunctionType = 'QUADRATIC';
    private subTypeGenerators: Map<QuadraticFunctionType, (randRange: NumberRange) => string[]> = new Map();

    constructor() {
        super();
        this.subTypeGenerators.set('STANDARD', this.generateStandardVariances);
        this.subTypeGenerators.set('VERTEX', this.generateVertexVarianes);
        this.subTypeGenerators.set('FACTORED', this.generateFactoredVariances);
    }

    public generate({
        randRange = this.getDefaultRandRange(),
        format = this.getRandomSubType(),
    }: QuadraticGenerationOptions = {}): MathFunction {
        const variances: string[] = this.subTypeGenerators.get(format)(randRange);
        return this.makeMathFunction(variances, format);
    }

    private getRandomSubType(): QuadraticFunctionType {
        const randomSubTypePool: QuadraticFunctionType[] = ['STANDARD', 'FACTORED', 'VERTEX'];
        const randomSubType: QuadraticFunctionType = sample(randomSubTypePool);
        return randomSubType;
    }

    private generateStandardVariances(randRange: NumberRange): string[] {
        const a: number = random(randRange.min, randRange.max, false);
        const b: number = random(randRange.min, randRange.max, false);
        const c: number = random(randRange.min, randRange.max, false);
        const variances: string[] = [
            `y = ${a}x^2 + ${b}x + ${c}`,
            `y = ${a * -1}x^2 + ${b}x + ${c}`,
            `y = ${a}x^2 + ${b * -1}x + ${c}`,
            `y = ${a}x^2 + ${b}x + ${c * -1}`,
            `y = ${a * -1}x^2 + ${b * -1}x + ${c * -1}`,
        ];
        return variances;
    }

    private generateVertexVarianes(randRange: NumberRange): string[] {
        const a: number = random(randRange.min, randRange.max, false);
        const h: number = random(randRange.min, randRange.max, false);
        const k: number = random(randRange.min, randRange.max, false);
        const variances: string[] = [
            `y = ${a}(x - ${h})^2 + ${k}`,
            `y = ${a * -1}(x - ${h})^2 + ${k}`,
            `y = ${a}(x - ${h * -1})^2 + ${k}`,
            `y = ${a}(x - ${h * -1})^2 + ${k * -1}`,
        ];
        return variances;
    }

    private generateFactoredVariances(randRange: NumberRange): string[] {
        const a: number = random(randRange.min, randRange.max, false);
        const p: number = random(randRange.min, randRange.max, false);
        const q: number = random(randRange.min, randRange.max, false);
        const variances: string[] = [
            `y = ${a}(x + ${p})(x + ${q})`,
            `y = ${a * -1}(x + ${p})(x + ${q})`,
            `y = ${a}(x + ${p * -1})(x + ${q * -1})`,
            `y = ${a * -1}(x + ${p * -1})(x + ${q * -1})`,
        ];
        return variances;
    }
}
