import {DeviationTolerance} from "../src/DeviationTolerance";

describe('Deviation Tolerance', () => {

    describe('When constructing with factory method', () => {

        test('Upper bound getter should return correct value', () => {
            const upper = 0.2;
            const lower = -0.1;
            const tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(upper, lower);
            expect(tolerance.getUpper()).toBe(upper);
        });

        test('Lower bound getter should return correct value', () => {
            const upper = 0.2;
            const lower = -0.1;
            const tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(upper, lower);
            expect(tolerance.getLower()).toBe(lower);
        });

        test('Should throw error if upper bound is an infinite number', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(Infinity, -0.1)).toThrow();
        });

        test('Should throw error if upper bound is NaN', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(NaN, -0.1)).toThrow();
        });

        test('Should throw error if lower bound is an infinite number', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, Infinity)).toThrow();
        });

        test('Should throw error if lower bound is NaN', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, NaN)).toThrow();
        });

        test('Should not throw error if upper bound is greater than lower bound', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, -0.1)).not.toThrow();
        });

        test('Should not throw error if upper bound is equal to lower bound', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, 0.1)).not.toThrow();
        });

        test('Should throw error if upper bound is smaller than lower bound', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(-0.1, 0.1)).toThrow();
        });
    });
});