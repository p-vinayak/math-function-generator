import { random } from 'lodash';
import NumberRange from '../entities/RandRange';
import GenerationOptions from '../entities/GenerationOptions';
import MathFunction from './MathFunction';
import sanitizeEquationVariances from '../utils/sanitizeEquationVariances';

export type LinearFunctionSubType =
  | 'STANDARD'
  | 'POINT-SLOPE'
  | 'SLOPE-INTERCEPT';

export interface LinearGenerationOptions extends GenerationOptions {
  subType?: LinearFunctionSubType;
}

export class LinearFunction extends MathFunction {
  protected subType: LinearFunctionSubType;
  protected equations: string[];

  constructor({
    subType = 'SLOPE-INTERCEPT',
    randRange = { min: 10, max: 20 },
  }: LinearGenerationOptions = {}) {
    super();
    switch (subType) {
      case 'POINT-SLOPE':
        this.equations = this.generatePointSlopeVariances(randRange);
        break;
      case 'STANDARD':
        this.equations = this.generateStandardVariances(randRange);
        break;
      case 'SLOPE-INTERCEPT':
        this.equations = this.generateSlopeInterceptVariances(randRange);
        break;
      default:
        this.equations = this.generateSlopeInterceptVariances(randRange);
    }
    this.equations = sanitizeEquationVariances(this.equations);
    this.subType = subType;
  }

  private generateSlopeInterceptVariances(randRange: NumberRange) {
    const m: number = random(randRange.min, randRange.max, false);
    const b: number = random(randRange.min, randRange.max, false);
    const equationVariances: string[] = [
      `y = ${m}x + ${b}`,
      `y = ${m}x + ${b * -1}`,
      `y = ${m * -1}x + ${b}`,
      `y = ${m * -1}x - ${b * -1}`,
    ];
    return equationVariances;
  }

  private generatePointSlopeVariances(randRange: NumberRange) {
    const m: number = random(randRange.min, randRange.max, false);
    const y1: number = random(randRange.min, randRange.max, false);
    const x1: number = random(randRange.min, randRange.max, false);
    const equationVariances: string[] = [
      `y - ${y1} = ${m * -1}(x - ${x1})`,
      `y - ${y1 * -1} = ${m}(x - ${x1})`,
      `y - ${y1} = ${m}(x - ${x1 * -1})`,
      `y - ${y1 * -1} = ${m}(x - ${x1 * -1})`,
    ];
    return equationVariances;
  }

  private generateStandardVariances(randRange: NumberRange) {
    const a: number = random(randRange.min, randRange.max, false);
    const b: number = random(randRange.min, randRange.max, false);
    const c: number = random(randRange.min, randRange.max, false);
    const equationVariances: string[] = [
      `${a}x + ${b}y = ${c}`,
      `${a * -1}x + ${b}y = ${c}`,
      `${a}x + ${b * -1}y = ${c}`,
      `${a * -1}x + ${b * -1}y = ${c}`,
    ];
    return equationVariances;
  }
}
