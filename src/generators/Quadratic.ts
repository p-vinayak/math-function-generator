import { random } from 'lodash';
import GenerationOptions from '../entities/GenerationOptions';
import NumberRange from '../entities/RandRange';
import sanitizeEquationVariances from '../utils/sanitizeEquationVariances';
import MathFunction from './MathFunction';

export type QuadraticFunctionSubType = 'STANDARD' | 'VERTEX' | 'FACTORED';

export interface QuadraticGenerationOptions extends GenerationOptions {
  subType?: QuadraticFunctionSubType;
}

export class QuadraticFunction extends MathFunction {
  protected subType: QuadraticFunctionSubType;
  protected equations: string[];

  constructor({
    subType = 'STANDARD',
    randRange = { min: 10, max: 20 },
  }: QuadraticGenerationOptions = {}) {
    super();
    switch (subType) {
      case 'STANDARD':
        this.equations = this.generateStandardVariances(randRange);
        break;
      case 'VERTEX':
        this.equations = this.generateVertexVariances(randRange);
        break;
      case 'FACTORED':
        this.equations = this.generateFactoredVariances(randRange);
        break;
      default:
        this.equations = this.generateStandardVariances(randRange);
    }
    this.equations = sanitizeEquationVariances(this.equations);
    this.subType = subType;
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

  private generateVertexVariances(randRange: NumberRange): string[] {
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
