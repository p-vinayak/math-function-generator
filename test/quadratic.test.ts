import { QuadraticFunction } from '../src';

describe('Random Quadratic Function', () => {
  const randRange = { min: 10, max: 20 };

  it('should have appropriate sub-type', () => {
    const standardSubType = new QuadraticFunction({
      subType: 'STANDARD',
    }).getSubType();
    const vertexSubType = new QuadraticFunction({
      subType: 'VERTEX',
    }).getSubType();
    const factoredSubType = new QuadraticFunction({
      subType: 'FACTORED',
    }).getSubType();

    expect(standardSubType).toBe('STANDARD');
    expect(vertexSubType).toBe('VERTEX');
    expect(factoredSubType).toBe('FACTORED');
  });

  it('should have appropriate form', () => {
    const standardEquations = new QuadraticFunction({
      subType: 'STANDARD',
    }).getEquations();
    const vertexEquations = new QuadraticFunction({
      subType: 'VERTEX',
    }).getEquations();
    const factoredEquations = new QuadraticFunction({
      subType: 'FACTORED',
    }).getEquations();

    expect(standardEquations).toEqual(
      expect.arrayContaining([
        expect.stringMatching(
          /y = (\-|)[0-9]*x\^2 (\+|\-) [0-9]*x (\+|\-) [0-9]*/
        ),
      ])
    );
    expect(standardEquations).toEqual(
      expect.not.arrayContaining([
        expect.not.stringMatching(
          /y = (\-|)[0-9]*x\^2 (\+|\-) [0-9]*x (\+|\-) [0-9]*/
        ),
      ])
    );

    expect(vertexEquations).toEqual(
      expect.arrayContaining([
        expect.stringMatching(
          /y = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)\^2 (\+|\-) [0-9]*/
        ),
      ])
    );
    expect(vertexEquations).toEqual(
      expect.not.arrayContaining([
        expect.not.stringMatching(
          /y = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)\^2 (\+|\-) [0-9]*/
        ),
      ])
    );

    expect(factoredEquations).toEqual(
      expect.arrayContaining([
        expect.stringMatching(
          /y = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)\(x (\+|\-) [0-9]*\)/
        ),
      ])
    );
    expect(factoredEquations).toEqual(
      expect.not.arrayContaining([
        expect.not.stringMatching(
          /y = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)\(x (\+|\-) [0-9]*\)/
        ),
      ])
    );
  });

  it('should have constants that lie within the specified randRange', () => {
    const equations = new QuadraticFunction({
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
