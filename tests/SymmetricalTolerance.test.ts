import {SymmetricalTolerance} from "../src/SymmetricalTolerance";

describe('Symmetrical Tolerance', () => {

    describe('When constructing with factory method', () => {

        describe('With valid inputs', () => {
            [2.5, 1.0, 0.0, -1.0, -2.5].forEach(mm => {
                test(`Should return upper and lower bounds as ${Math.abs(mm)} and -${Math.abs(mm)} for ${mm} mm`, () => {
                    const tolerance = SymmetricalTolerance.fromMillimetres(mm);
                    expect(tolerance.getUpper()).toBe(Math.abs(mm));
                    expect(tolerance.getLower()).toBe(-Math.abs(mm));
                });
            });
        });

        describe('With edge cases', () => {
            [Number.MAX_VALUE, Number.MIN_VALUE, 1e-10].forEach(mm => {
                test(`Should handle edge case ${mm} mm correctly`, () => {
                    const tolerance = SymmetricalTolerance.fromMillimetres(mm);
                    expect(tolerance.getUpper()).toBe(Math.abs(mm));
                    expect(tolerance.getLower()).toBe(-Math.abs(mm));
                });
            });
        });

        describe('With invalid inputs', () => {
            [NaN, Infinity, -Infinity].forEach(mm => {
                test(`Should throw an error for invalid input ${mm}`, () => {
                    expect(() => SymmetricalTolerance.fromMillimetres(mm)).toThrow();
                });
            });
        });
    });
});