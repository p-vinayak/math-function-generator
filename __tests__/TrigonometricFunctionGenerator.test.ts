import { TrigonometricFunctionGenerator, TrigonometricFunctionType, NumberRange } from '../src';

describe('Random Trigonometric Function', () => {
    const generator = new TrigonometricFunctionGenerator();
    const randRange: NumberRange = { min: 10, max: 20 };
    const subTypes: TrigonometricFunctionType[] = ['COS', 'SIN', 'TAN', 'SEC', 'CSC', 'COT'];

    it('Should have a TRIGONOMETRIC type', () => {
        const { type } = generator.generate();
        expect(type).toBe('TRIGONOMETRIC');
    });

    it('Should have appropriate subType', () => {
        subTypes.forEach((subType) => {
            const { subType: generatedSubType, functionVariances } = generator.generate({ type: subType });
            const regexp = `${subType.toLocaleLowerCase()}`;
            expect(generatedSubType).toBe(subType);
            expect(functionVariances).toEqual(expect.arrayContaining([expect.stringMatching(new RegExp(regexp, 'g'))]));
        });
    });

    it('Should have a functionString value that exists in functionVariances', () => {
        const { functionVariances, functionString } = generator.generate();
        expect(functionVariances).toContain(functionString);
    });

    it('Should have the appropriate form', () => {
        const { functionVariances } = generator.generate();
        expect(functionVariances).toEqual(
            expect.arrayContaining([
                expect.stringMatching(
                    /y = (\-|)[0-9]* \* (sin|cos|tan|sec|csc|cot)\([0-9]*x (\+|\-) ([0-9]*|[0-9]*\/[0-9]*)\) (\+|\-) [0-9]*/,
                ),
            ]),
        );
        expect(functionVariances).toEqual(
            expect.not.arrayContaining([
                expect.not.stringMatching(
                    /y = (\-|)[0-9]* \* (sin|cos|tan|sec|csc|cot)\([0-9]*x (\+|\-) ([0-9]*|[0-9]*\/[0-9]*)\) (\+|\-) [0-9]*/,
                ),
            ]),
        );
    });

    it('Should have constants that only lie within the specified randRange', () => {
        const { functionVariances } = generator.generate({ randRange: randRange });
        functionVariances.forEach((variance) => {
            const varianceConstants: number[] = variance.match(/\d+/g).map((constant) => Number(constant));
            varianceConstants.forEach((constant) => {
                expect(constant).toBeGreaterThanOrEqual(randRange.min);
                expect(constant).toBeLessThanOrEqual(randRange.max);
            });
        });
    });
});
