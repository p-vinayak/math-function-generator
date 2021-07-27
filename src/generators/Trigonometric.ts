import { random } from 'lodash';
import GenerationOptions from '../entities/GenerationOptions';
import NumberRange from '../entities/RandRange';
import sanitizeEquationVariances from '../utils/sanitizeEquationVariances';
import MathFunction from './MathFunction';

export type TrigonometricFunctionSubType =
  | 'COS'
  | 'SIN'
  | 'TAN'
  | 'COT'
  | 'SEC'
  | 'CSC';

export interface TrigonometricGenerationOptions extends GenerationOptions {
  subType?: TrigonometricFunctionSubType;
}

export class TrigonometricFunction extends MathFunction {
  protected subType: TrigonometricFunctionSubType;
  protected equations: string[];

  constructor({
    subType = 'SIN',
    randRange = { min: 10, max: 20 },
  }: TrigonometricGenerationOptions = {}) {
    super();
    this.equations = this.generateVariances(subType, randRange);
    this.equations = sanitizeEquationVariances(this.equations);
    this.subType = subType;
  }

  private generateVariances(
    subType: TrigonometricFunctionSubType,
    randRange: NumberRange
  ) {
    const a: number = random(randRange.min, randRange.max, false);
    const b: number = random(randRange.min, randRange.max, false);
    const c: number = random(randRange.min, randRange.max, false);
    const d: number = random(randRange.min, randRange.max, false);
    const variances: string[] = [
      `y = ${a} * ${subType.toLowerCase()}(${b}x + ${c}) + ${d}`,
      `y = ${a * -1} * ${subType.toLowerCase()}(${b}x + ${c}) + ${d}`,
      `y = ${a} * ${subType.toLowerCase()}(${b}x + ${c * -1}) + ${d}`,
      `y = ${a} * ${subType.toLowerCase()}(${b}x + ${c}/${b}) + ${d}`,
    ];

    return variances;
  }
}
