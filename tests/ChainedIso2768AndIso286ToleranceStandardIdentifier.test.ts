import {ToleranceStandardIdentifierFactory} from "../src/ToleranceStandardIdentifierFactory";
import {ToleranceStandardIdentifier} from "../src/ToleranceStandardIdentifier";
import {DimensionWithTolerance} from "../src/DimensionWithTolerance";
import {Dimension} from "../src/Dimension";
import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {ToleranceStandard} from "../src/ToleranceStandard";
import {Iso2768ToleranceStandard} from "../src/Iso2768ToleranceStandard";
import {Iso286ToleranceStandard} from "../src/Iso286ToleranceStandard";
import {DeviationTolerance} from "../src/DeviationTolerance";

// The chained ISO 2768 and ISO 286 tolerance standard identifier is
// constructed with the ToleranceStandardIdentifierFactory and is not
// a class on its own.

describe('ChainedIso2768AndIso286ToleranceStandardIdentifier', () => {

    const identifier: ToleranceStandardIdentifier = ToleranceStandardIdentifierFactory.createChainedIso2768AndIso286Identifier();

    // ISO 2768 lower nominal size limit is 0.5 mm.
    // ISO 286 lower nominal size limit is above 0 mm.
    test('Should not identify tolerance standard for dimension less than ISO 2768 and ISO 286 nominal size', () => {
        const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
            Dimension.fromMillimetres(0.0), DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(18, 0));
        const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
        expect(result).toBeNull();
    });

    // ISO 2768 upper nominal size limit is 4000 mm.
    // ISO 286 upper nominal size limit is 3150 mm.
    test('Should not identify tolerance standard for dimension greater than ISO 2768 and ISO 286 nominal size', () => {
        const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
            Dimension.fromMillimetres(4000.1), SymmetricalTolerance.fromMillimetres(8.0));
        const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
        expect(result).toBeNull();
    });

    describe('When identifying tolerance standard for 12 mm with varying tolerances', () => {

        test('Should identify ISO 2768 v for tolerance ±1.0 mm', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), SymmetricalTolerance.fromMillimetres(1.0));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
        });

        test('Should identify ISO 2768 c for tolerance ±0.5 mm', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), SymmetricalTolerance.fromMillimetres(0.5));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
        });

        test('Should identify ISO 2768 m for tolerance ±0.2 mm', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), SymmetricalTolerance.fromMillimetres(0.2));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
        });

        test('Should identify ISO 2768 f for tolerance ±0.1 mm', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), SymmetricalTolerance.fromMillimetres(0.1));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
        });

        test('Should identify ISO 286 IT10 for tolerance +70/-0 um', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(70, 0));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade('IT10'));
        });

        test('Should identify ISO 286 IT9 for tolerance +43/-0 um', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(43, 0));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade('IT9'));
        });

        test('Should identify ISO 286 IT8 for tolerance +27/-0 um', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(27, 0));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade('IT8'));
        });

        test('Should identify ISO 286 IT7 for tolerance +18/-0 um', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(18, 0));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade('IT7'));
        });

        test('Should identify ISO 286 IT6 for tolerance +11/-0 um', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(11, 0));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade('IT6'));
        });

        test('Should not identify tolerance standard when tolerance is too narrow', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(12.0), DeviationTolerance.fromUpperAndLowerBoundsInMicrometres(7, 0));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toBeNull();
        });
    });
});