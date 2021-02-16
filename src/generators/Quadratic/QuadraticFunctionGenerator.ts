import { MathFunction, NumberRange } from '../../entities';
import { QuadraticGenerationOptions } from './QuadraticGenerationOptions';
import { MathFunctionGenerator } from '../MathFunctionGenerator';
import { random } from 'lodash';

export class QuadraticFunctionGenerator extends MathFunctionGenerator<QuadraticGenerationOptions> {
    protected mathFunctionType = 'QUADRATIC';

    public generate({
        randRange = this.getDefaultRandRange(),
        format = 'STANDARD',
    }: QuadraticGenerationOptions = {}): MathFunction {
        const variances: string[] = this.generateVariances(format, randRange);
        return this.makeMathFunction(variances);
    }

    private generateVariances(format: string, randRange: NumberRange): string[] {
        switch (format.toUpperCase()) {
            case 'STANDARD':
                return this.generateStandardVariances(randRange);
            case 'VERTEX':
                return this.generateVertexVarianes(randRange);
            case 'FACTORED':
                return this.generateFactoredVariances(randRange);
            default:
                return this.generateStandardVariances(randRange);
        }
    }

    private generateStandardVariances(randRange: NumberRange): string[] {
        this.setSubType('STANDARD');
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
        this.setSubType('VERTEX');
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
        this.setSubType('FACTORED');
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
