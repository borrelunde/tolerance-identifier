import {ToleranceConverter} from "../src/ToleranceConverter";
import {Tolerance} from "../src/Tolerance";
import {DeviationTolerance} from "../src/DeviationTolerance";
import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {ToleranceWidth} from "../src/ToleranceWidth";

describe('ToleranceConverter', () => {

    describe('When converting tolerance to tolerance width', () => {

        test('Should convert positive symmetrical tolerance', () => {
            const tolerance: Tolerance = SymmetricalTolerance.fromMillimetres(0.1);
            const toleranceWidth: ToleranceWidth = ToleranceConverter.convertToleranceToToleranceWidth(tolerance);
            expect(toleranceWidth).toStrictEqual(ToleranceWidth.fromMillimetres(0.2));
        });

        test('Should convert zero symmetrical tolerance', () => {
            const tolerance: Tolerance = SymmetricalTolerance.fromMillimetres(0.0);
            const toleranceWidth: ToleranceWidth = ToleranceConverter.convertToleranceToToleranceWidth(tolerance);
            expect(toleranceWidth).toStrictEqual(ToleranceWidth.fromMillimetres(0.0));
        });

        test('Should convert negative symmetrical tolerance', () => {
            const tolerance: Tolerance = SymmetricalTolerance.fromMillimetres(-0.1);
            const toleranceWidth: ToleranceWidth = ToleranceConverter.convertToleranceToToleranceWidth(tolerance);
            expect(toleranceWidth).toStrictEqual(ToleranceWidth.fromMillimetres(0.2));
        });

        test('Should convert positive deviation tolerance', () => {
            const tolerance: Tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, 0.05);
            const toleranceWidth: ToleranceWidth = ToleranceConverter.convertToleranceToToleranceWidth(tolerance);
            expect(toleranceWidth).toStrictEqual(ToleranceWidth.fromMillimetres(0.05));
        });

        test('Should convert zero deviation tolerance', () => {
            const tolerance: Tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.0, 0.0);
            const toleranceWidth: ToleranceWidth = ToleranceConverter.convertToleranceToToleranceWidth(tolerance);
            expect(toleranceWidth).toStrictEqual(ToleranceWidth.fromMillimetres(0.0));
        })

        test('Should convert negative deviation tolerance', () => {
            const tolerance: Tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(-0.05, -0.1);
            const toleranceWidth: ToleranceWidth = ToleranceConverter.convertToleranceToToleranceWidth(tolerance);
            expect(toleranceWidth).toStrictEqual(ToleranceWidth.fromMillimetres(0.05));
        });
    });
});