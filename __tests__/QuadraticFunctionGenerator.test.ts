import { QuadraticFunctionGenerator, NumberRange } from '../src';

describe('Random Quadratic Function', () => {
    const generator = new QuadraticFunctionGenerator();
    const randRange: NumberRange = { min: 10, max: 20 };

    it('Should have a QUADRATIC type', () => {
        const { type } = generator.generate();
        expect(type).toBe('QUADRATIC');
    });

    it('Should have appropriate subType', () => {
        const { subType: standardType } = generator.generate({ format: 'STANDARD' });
        const { subType: vertexType } = generator.generate({ format: 'VERTEX' });
        const { subType: factoredType } = generator.generate({ format: 'FACTORED' });

        expect(standardType).toBe('STANDARD');
        expect(vertexType).toBe('VERTEX');
        expect(factoredType).toBe('FACTORED');
    });

    it('Should have a functionString value that exists in functionVariances', () => {
        const { functionVariances, functionString } = generator.generate();
        expect(functionVariances).toContain(functionString);
    });

    it('Should have the appropriate form', () => {
        const { functionVariances: standardVariances } = generator.generate({ format: 'STANDARD' });
        const { functionVariances: vertexVariances } = generator.generate({ format: 'VERTEX' });
        const { functionVariances: factoredVariances } = generator.generate({ format: 'FACTORED' });

        expect(standardVariances).toEqual(
            expect.arrayContaining([expect.stringMatching(/y = (\-|)[0-9]*x\^2 (\+|\-) [0-9]*x (\+|\-) [0-9]*/)]),
        );
        expect(standardVariances).toEqual(
            expect.not.arrayContaining([
                expect.not.stringMatching(/y = (\-|)[0-9]*x\^2 (\+|\-) [0-9]*x (\+|\-) [0-9]*/),
            ]),
        );

        expect(vertexVariances).toEqual(
            expect.arrayContaining([expect.stringMatching(/y = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)\^2 (\+|\-) [0-9]*/)]),
        );
        expect(vertexVariances).toEqual(
            expect.not.arrayContaining([
                expect.not.stringMatching(/y = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)\^2 (\+|\-) [0-9]*/),
            ]),
        );

        expect(factoredVariances).toEqual(
            expect.arrayContaining([expect.stringMatching(/y = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)\(x (\+|\-) [0-9]*\)/)]),
        );
        expect(factoredVariances).toEqual(
            expect.not.arrayContaining([
                expect.not.stringMatching(/y = (\-|)[0-9]*\(x (\+|\-) [0-9]*\)\(x (\+|\-) [0-9]*\)/),
            ]),
        );
    });

    it('Should have constants that only lie within the specified randRange', () => {
        const { functionVariances } = generator.generate({ randRange: randRange });

        functionVariances.forEach((variance) => {
            const varianceConstants: number[] = variance.match(/(?<!\^)(\d+)/g).map((constant) => Number(constant));
            varianceConstants.forEach((constant) => {
                expect(constant).toBeGreaterThanOrEqual(randRange.min);
                expect(constant).toBeLessThanOrEqual(randRange.max);
            });
        });
    });
});
