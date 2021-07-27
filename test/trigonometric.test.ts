import { TrigonometricFunction } from '../src';
import { TrigonometricFunctionSubType } from '../src/generators/Trigonometric';

describe('Random Trigonometric Function', () => {
  const randRange = { min: 10, max: 20 };
  const subTypes: TrigonometricFunctionSubType[] = [
    'COS',
    'SIN',
    'TAN',
    'COT',
    'SEC',
    'CSC',
  ];

  it('should have appropriate sub-type', () => {
    subTypes.forEach(subType => {
      const trigFunction = new TrigonometricFunction({ subType: subType });
      const generatedSubType = trigFunction.getSubType();
      const equations = trigFunction.getEquations();
      const regexp = `${subType.toLocaleLowerCase()}`;
      expect(generatedSubType).toBe(subType);
      expect(equations).toEqual(
        expect.arrayContaining([expect.stringMatching(new RegExp(regexp, 'g'))])
      );
    });
  });

  it('should have appropriate form', () => {
    const equations = new TrigonometricFunction().getEquations();
    expect(equations).toEqual(
      expect.arrayContaining([
        expect.stringMatching(
          /y = (\-|)[0-9]* \* (sin|cos|tan|sec|csc|cot)\([0-9]*x (\+|\-) ([0-9]*|[0-9]*\/[0-9]*)\) (\+|\-) [0-9]*/
        ),
      ])
    );
    expect(equations).toEqual(
      expect.not.arrayContaining([
        expect.not.stringMatching(
          /y = (\-|)[0-9]* \* (sin|cos|tan|sec|csc|cot)\([0-9]*x (\+|\-) ([0-9]*|[0-9]*\/[0-9]*)\) (\+|\-) [0-9]*/
        ),
      ])
    );
  });

  it('should have constants that lie within the specified randRange', () => {
    const equations = new TrigonometricFunction({
      randRange: randRange,
    }).getEquations();

    equations.forEach(variance => {
      const varianceConstants = variance
        .match(/(?<!\^)(\d+)/g)!
        .map(constant => Number(constant));
      varianceConstants.forEach(constant => {
        expect(constant).toBeGreaterThanOrEqual(randRange.min);
        expect(constant).toBeLessThanOrEqual(randRange.max);
      });
    });
  });
});
