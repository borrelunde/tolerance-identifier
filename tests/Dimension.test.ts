import {Dimension} from "../src/Dimension";

describe('Dimension', () => {

    test('Should construct from and return zero millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(0.0);
        expect(dimension.getMillimetres()).toBe(0.0);
    });

    test('Should construct from and return positive millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(1.0);
        expect(dimension.getMillimetres()).toBe(1.0);
    });

    test('Should construct from and return positive decimal millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(1.5);
        expect(dimension.getMillimetres()).toBe(1.5);
    });

    test('Should construct from and return negative millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(-1.0);
        expect(dimension.getMillimetres()).toBe(-1.0);
    });

    test('Should construct from and return negative decimal millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(-1.5);
        expect(dimension.getMillimetres()).toBe(-1.5);
    });

    describe('Greater-than comparison', () => {
        test('Should return false for a dimension equal to another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(1.0);
            const dimension2: Dimension = Dimension.fromMillimetres(1.0);
            expect(dimension1.lessThan(dimension2)).toBe(false);
        });

        test('Should return false for a dimension less than another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(1.0);
            const dimension2: Dimension = Dimension.fromMillimetres(2.0);
            expect(dimension1.lessThan(dimension2)).toBe(true);
        });

        test('Should return true for a dimension greater than another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(2.0);
            const dimension2: Dimension = Dimension.fromMillimetres(1.0);
            expect(dimension1.lessThan(dimension2)).toBe(false);
        });
    });

    describe('Greater-than-or-equal comparison', () => {
        test('Should return true for a dimension equal to another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(1.0);
            const dimension2: Dimension = Dimension.fromMillimetres(1.0);
            expect(dimension1.lessThan(dimension2)).toBe(false);
        });

        test('Should return false for a dimension less than another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(1.0);
            const dimension2: Dimension = Dimension.fromMillimetres(2.0);
            expect(dimension1.lessThan(dimension2)).toBe(true);
        });

        test('Should return true for a dimension greater than another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(2.0);
            const dimension2: Dimension = Dimension.fromMillimetres(1.0);
            expect(dimension1.lessThan(dimension2)).toBe(false);
        });
    });

    describe('Less-than comparison', () => {
        test('Should return false for a dimension equal to another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(1.0);
            const dimension2: Dimension = Dimension.fromMillimetres(1.0);
            expect(dimension1.lessThan(dimension2)).toBe(false);
        });

        test('Should return true for a dimension less than another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(1.0);
            const dimension2: Dimension = Dimension.fromMillimetres(2.0);
            expect(dimension1.lessThan(dimension2)).toBe(true);
        });

        test('Should return false for a dimension greater than another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(2.0);
            const dimension2: Dimension = Dimension.fromMillimetres(1.0);
            expect(dimension1.lessThan(dimension2)).toBe(false);
        });
    });

    describe('Less-than-or-equal comparison', () => {
        test('Should return true for a dimension equal to another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(1.0);
            const dimension2: Dimension = Dimension.fromMillimetres(1.0);
            expect(dimension1.lessThan(dimension2)).toBe(false);
        });

        test('Should return true for a dimension less than another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(1.0);
            const dimension2: Dimension = Dimension.fromMillimetres(2.0);
            expect(dimension1.lessThan(dimension2)).toBe(true);
        });

        test('Should return false for a dimension greater than another', () => {
            const dimension1: Dimension = Dimension.fromMillimetres(2.0);
            const dimension2: Dimension = Dimension.fromMillimetres(1.0);
            expect(dimension1.lessThan(dimension2)).toBe(false);
        });
    });
});