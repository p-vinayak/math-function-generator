import { LinearFunctionGenerator, NumberRange } from '../src';

describe('Random Linear Function', () => {
    const generator = new LinearFunctionGenerator();
    const randRange: NumberRange = { min: 10, max: 20 };
    const mathFunction = generator.generate({ randRange: randRange });
    const { subType, type, functionString, functionVariances } = mathFunction;

    it('Should have a LINEAR type', () => {
        expect(type).toBe('LINEAR');
    });

    it('Should have an undefined subType', () => {
        expect(subType).toBeUndefined();
    });

    it('Should have a functionString value that exists in functionVariances', () => {
        expect(functionVariances).toContain(functionString);
    });

    it('Should be of the form y = mx + b only', () => {
        expect(functionVariances).toEqual(
            expect.arrayContaining([expect.stringMatching(/y = (\-|)[0-9]*x (\+|\-) [0-9]*/)]),
        );
        expect(functionVariances).toEqual(
            expect.not.arrayContaining([expect.not.stringMatching(/y = (\-|)[0-9]*x (\+|\-) [0-9]*/)]),
        );
    });

    it('Should have constants that only lie within the specified randRange', () => {
        functionVariances.forEach((variance) => {
            const varianceConstants: number[] = variance.match(/\d+/g).map((constant) => Number(constant));
            varianceConstants.forEach((constant) => {
                expect(constant).toBeGreaterThanOrEqual(randRange.min);
                expect(constant).toBeLessThanOrEqual(randRange.max);
            });
        });
    });
});
