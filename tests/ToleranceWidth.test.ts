import {ToleranceWidth} from "../src/ToleranceWidth";

describe('ToleranceWidth', () => {

    describe('When constructing with factory method from millimetres', () => {

        test('Should create ToleranceWidth with correct positive width', () => {
            const toleranceWidth: ToleranceWidth = ToleranceWidth.fromMillimetres(0.5);
            expect(toleranceWidth.getWidthInMillimetres()).toBe(0.5);
        });

        test('Should create ToleranceWidth with zero width', () => {
            const toleranceWidth: ToleranceWidth = ToleranceWidth.fromMillimetres(0);
            expect(toleranceWidth.getWidthInMillimetres()).toBe(0);
        });

        test('Should throw range-error for negative width', () => {
            expect(() => {
                ToleranceWidth.fromMillimetres(-0.5);
            }).toThrow(RangeError);
        });

        test('Should throw range-error for infinite width', () => {
            expect(() => {
                ToleranceWidth.fromMillimetres(Infinity);
            }).toThrow(RangeError);
        })

        test('Should throw range-error for NaN width', () => {
            expect(() => {
                ToleranceWidth.fromMillimetres(NaN);
            }).toThrow(RangeError);
        });
    });

    describe('When constructing with factory method from micrometres', () => {

        test('Should create ToleranceWidth with correct positive width', () => {
            const toleranceWidth: ToleranceWidth = ToleranceWidth.fromMicrometres(500);
            expect(toleranceWidth.getWidthInMillimetres()).toBe(0.5);
        });

        test('Should create ToleranceWidth with zero width', () => {
            const toleranceWidth: ToleranceWidth = ToleranceWidth.fromMicrometres(0);
            expect(toleranceWidth.getWidthInMillimetres()).toBe(0);
        });

        test('Should throw range-error for negative width', () => {
            expect(() => {
                ToleranceWidth.fromMicrometres(-500);
            }).toThrow(RangeError);
        });

        test('Should throw range-error for infinite width', () => {
            expect(() => {
                ToleranceWidth.fromMillimetres(Infinity);
            }).toThrow(RangeError);
        })

        test('Should throw range-error for NaN width', () => {
            expect(() => {
                ToleranceWidth.fromMillimetres(NaN);
            }).toThrow(RangeError);
        });
    })
});