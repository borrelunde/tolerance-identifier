import {DeviationTolerance} from "../src/DeviationTolerance";
import {Tolerance} from "../src/Tolerance";

describe('Deviation Tolerance', () => {

    describe('When constructing with factory method in millimetres', () => {

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

    describe('When constructing with factory method in micrometres', () => {

        test('Upper bound getter should return correct value', () => {
            const upper = 200; // Micrometres.
            const lower = -100; // Micrometres.
            const tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(upper, lower);
            expect(tolerance.getUpper()).toBe(0.2); // Should be in millimetres.
        });

        test('Lower bound getter should return correct value', () => {
            const upper: number = 200; // Micrometres.
            const lower: number = -100; // Micrometres.
            const tolerance: Tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(upper, lower);
            expect(tolerance.getLower()).toBe(-0.1); // Should be in millimetres.
        });

        test('Should throw error if upper bound is an infinite number', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(Infinity, -100)).toThrow();
        });

        test('Should throw error if upper bound is NaN', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(NaN, -100)).toThrow();
        });

        test('Should throw error if lower bound is an infinite number', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(200, Infinity)).toThrow();
        });

        test('Should throw error if lower bound is NaN', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(200, NaN)).toThrow();
        });

        test('Should not throw error if upper bound is greater than lower bound', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(200, -100)).not.toThrow();
        });

        test('Should not throw error if upper bound is equal to lower bound', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(100, 100)).not.toThrow();
        });

        test('Should throw error if upper bound is smaller than lower bound', () => {
            expect(() => DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(-100, 200)).toThrow();
        });
    })
});