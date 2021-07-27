import { LinearFunction } from '../src';

describe('Random Linear Function', () => {
  const randRange = { min: 10, max: 20 };

  it('should have appropriate sub-type', () => {
    const standardSubType = new LinearFunction({
      subType: 'STANDARD',
    }).getSubType();

    const pointSlopeSubType = new LinearFunction({
      subType: 'POINT-SLOPE',
    }).getSubType();

    const slopeInterceptSubType = new LinearFunction({
      subType: 'SLOPE-INTERCEPT',
    }).getSubType();

    expect(standardSubType).toBe('STANDARD');
    expect(pointSlopeSubType).toBe('POINT-SLOPE');
    expect(slopeInterceptSubType).toBe('SLOPE-INTERCEPT');
  });

  it('should have appropriate form', () => {
    const standardEquations = new LinearFunction({
      subType: 'STANDARD',
    }).getEquations();
    const pointSlopeEquations = new LinearFunction({
      subType: 'POINT-SLOPE',
    }).getEquations();
    const slopeInterceptEquations = new LinearFunction({
      subType: 'SLOPE-INTERCEPT',
    }).getEquations();

    expect(slopeInterceptEquations).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/y = (\-|)[0-9]*x (\+|\-) [0-9]*/),
      ])
    );
    expect(slopeInterceptEquations).toEqual(
      expect.not.arrayContaining([
        expect.not.stringMatching(/y = (\-|)[0-9]*x (\+|\-) [0-9]*/),
      ])
    );
    expect(pointSlopeEquations).toEqual(
      expect.arrayContaining([
        expect.stringMatching(
          /y (\+|\-) [0-9]* = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)/
        ),
      ])
    );
    expect(pointSlopeEquations).toEqual(
      expect.not.arrayContaining([
        expect.not.stringMatching(
          /y (\+|\-) [0-9]* = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)/
        ),
      ])
    );
    expect(standardEquations).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/(\-|)[0-9]*x (\+|\-) [0-9]*y = (\-|)[0-9]*/),
      ])
    );
    expect(standardEquations).toEqual(
      expect.not.arrayContaining([
        expect.not.stringMatching(/(\-|)[0-9]*x (\+|\-) [0-9]*y = (\-|)[0-9]*/),
      ])
    );
  });

  it('should have constants that lie within the specified randRange', () => {
    const equations = new LinearFunction({
      randRange: randRange,
    }).getEquations();

    equations.forEach(variance => {
      const varianceConstants: number[] = variance
        .match(/(?<!\^)(\d+)/g)!
        .map(constant => Number(constant));
      varianceConstants.forEach(constant => {
        expect(constant).toBeGreaterThanOrEqual(randRange.min);
        expect(constant).toBeLessThanOrEqual(randRange.max);
      });
    });
  });
});
