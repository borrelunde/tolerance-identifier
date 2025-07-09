import {Iso2768ToleranceStandardIdentifier} from "../src/Iso2768ToleranceStandardIdentifier";
import {DimensionWithTolerance} from "../src/DimensionWithTolerance";
import {Dimension} from "../src/Dimension";
import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {DeviationTolerance} from "../src/DeviationTolerance";
import {ToleranceStandard} from "../src/ToleranceStandard";
import {Iso2768ToleranceStandard} from "../src/Iso2768ToleranceStandard";

describe('ISO 2768-1 Tolerance Standard Identifier', () => {

    const identifier: Iso2768ToleranceStandardIdentifier = new Iso2768ToleranceStandardIdentifier();

    // Use the tolerance table for linear dimensions in the ISO 2768-1:1989
    // documentation as reference: docs/iso-2768-1-1989.md

    describe('With edge cases', () => {
        test('Should not identify a tolerance standard for a dimension less than the nominal range', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(0.4), SymmetricalTolerance.fromMillimetres(0.0));  // The tolerance is irrelevant in this case.
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toBeNull();
        });

        test('Should not identify a tolerance standard for a dimension greater than the nominal range', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(4001), SymmetricalTolerance.fromMillimetres(0.0));  // The tolerance is irrelevant in this case.
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toBeNull();
        })
    });

    describe('Nominal size range from 0.5 mm up to 3 mm', () => {

        describe('ISO 2768-f', () => {

            test('Should identify \'fine\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), SymmetricalTolerance.fromMillimetres(0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.05, -0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with wider symmetrical tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), SymmetricalTolerance.fromMillimetres(0.09));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should identify \'fine\' for dimension with wider deviation tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.05, -0.06));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.01));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.01, -0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });
        });

        describe('ISO 2768-m', () => {

            test('Should identify \'medium\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, -0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with wider symmetrical tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), SymmetricalTolerance.fromMillimetres(0.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should identify \'medium\' for dimension with wider deviation tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, -0.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.09));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.09, -0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });
        });

        describe('ISO 2768-c', () => {

            test('Should identify \'coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with much wider symmetrical tolerance', () => {
                // There is no 'very coarse' tolerance for this nominal size range.
                // Therefore, there is no wider limit for this tolerance class.
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should identify \'coarse\' for dimension with much wider deviation tolerance', () => {
                // There is no 'very coarse' tolerance for this nominal size range.
                // Therefore, there is no wider limit for this tolerance class.
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(0.5), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.19, -0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })
        });

        // ISO 2768-v is not covered for this nominal size range.
    });

    describe('Nominal size range from over 3 mm up to 6 mm', () => {

        describe('ISO 2768-f', () => {

            test('Should identify \'fine\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.05, -0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with wider symmetrical tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.09));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should identify \'fine\' for dimension with wider deviation tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.05, -0.06));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.01));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.01, -0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });
        });

        describe('ISO 2768-m', () => {

            test('Should identify \'medium\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, -0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with wider symmetrical tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.29));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should identify \'medium\' for dimension with wider deviation tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, -0.29));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.09));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.09, -0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.4, -0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });
        });

        describe('ISO 2768-c', () => {

            test('Should identify \'coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with wider symmetrical tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should identify \'coarse\' for dimension with wider deviation tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.29));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.29, -0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.6, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });
        });

        describe('ISO 2768-v', () => {

            test('Should identify \'very coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.5, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with wider symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })

            test('Should identify \'very coarse\' for dimension with wider deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.5, -0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.49, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })
        });
    });

    describe('Nominal size range from over 6 mm up to 30 mm', () => {

        describe('ISO 2768-f', () => {

            test('Should identify \'fine\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, -0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with wider symmetrical tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), SymmetricalTolerance.fromMillimetres(0.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should identify \'fine\' for dimension with wider deviation tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, -0.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.05));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.05, -0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });
        });

        describe('ISO 2768-m', () => {

            test('Should identify \'medium\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with wider symmetrical tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), SymmetricalTolerance.fromMillimetres(0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should identify \'medium\' for dimension with wider deviation tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.19, -0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.6, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });
        });

        describe('ISO 2768-c', () => {

            test('Should identify \'coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.5, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with wider symmetrical tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), SymmetricalTolerance.fromMillimetres(0.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should identify \'coarse\' for dimension with wider deviation tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.5, -0.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(1.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.49, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.2, -1.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });
        });

        describe('ISO 2768-v', () => {

            test('Should identify \'very coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(1.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30), SymmetricalTolerance.fromMillimetres(1.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.0, -1.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with wider symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), SymmetricalTolerance.fromMillimetres(1.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })

            test('Should identify \'very coarse\' for dimension with wider deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(15), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.0, -1.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(6.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.99, -1.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })
        });
    });

    describe('Nominal size range from over 30 mm up to 120 mm', () => {

        describe('ISO 2768-f', () => {

            test('Should identify \'fine\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.15));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120), SymmetricalTolerance.fromMillimetres(0.15));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.15, -0.15));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with wider symmetrical tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), SymmetricalTolerance.fromMillimetres(0.29));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should identify \'fine\' for dimension with wider deviation tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.15, -0.29));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.1));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.1, -0.15));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.4, -0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });
        });

        describe('ISO 2768-m', () => {

            test('Should identify \'medium\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with wider symmetrical tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), SymmetricalTolerance.fromMillimetres(0.79));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should identify \'medium\' for dimension with wider deviation tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.79));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.29));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.29, -0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.9, -0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });
        });

        describe('ISO 2768-c', () => {

            test('Should identify \'coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120), SymmetricalTolerance.fromMillimetres(0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.8, -0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with wider symmetrical tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), SymmetricalTolerance.fromMillimetres(1.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should identify \'coarse\' for dimension with wider deviation tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.8, -1.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.79));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(1.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.79, -0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.8, -1.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });
        });

        describe('ISO 2768-v', () => {

            test('Should identify \'very coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(1.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120), SymmetricalTolerance.fromMillimetres(1.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.5, -1.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with wider symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), SymmetricalTolerance.fromMillimetres(2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })

            test('Should identify \'very coarse\' for dimension with wider deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(60), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.5, -2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(1.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(30.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.49, -1.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })
        });
    });

    describe('Nominal size range from over 120 mm up to 400 mm', () => {

        describe('ISO 2768-f', () => {

            test('Should identify \'fine\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with wider symmetrical tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), SymmetricalTolerance.fromMillimetres(0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should identify \'fine\' for dimension with wider deviation tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(0.15));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.15, -0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.6, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });
        });

        describe('ISO 2768-m', () => {

            test('Should identify \'medium\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.5, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with wider symmetrical tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), SymmetricalTolerance.fromMillimetres(1.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should identify \'medium\' for dimension with wider deviation tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.5, -1.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(0.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.49, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.5, -1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });
        });

        describe('ISO 2768-c', () => {

            test('Should identify \'coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400), SymmetricalTolerance.fromMillimetres(1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.2, -1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with wider symmetrical tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), SymmetricalTolerance.fromMillimetres(2.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should identify \'coarse\' for dimension with wider deviation tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.2, -2.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(1.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(2.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.19, -1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(3.0, -2.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });
        });

        describe('ISO 2768-v', () => {

            test('Should identify \'very coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(2.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400), SymmetricalTolerance.fromMillimetres(2.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.5, -2.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with wider symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), SymmetricalTolerance.fromMillimetres(3.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })

            test('Should identify \'very coarse\' for dimension with wider deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(250), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.5, -3.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(2.49));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(120.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.49, -2.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })
        });
    });

    describe('Nominal size range from over 400 mm up to 1000 mm', () => {

        describe('ISO 2768-f', () => {

            test('Should identify \'fine\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with wider symmetrical tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), SymmetricalTolerance.fromMillimetres(0.79));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should identify \'fine\' for dimension with wider deviation tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.79));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(0.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.2, -0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.0, -0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });
        });

        describe('ISO 2768-m', () => {

            test('Should identify \'medium\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000), SymmetricalTolerance.fromMillimetres(0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.8, -0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with wider symmetrical tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), SymmetricalTolerance.fromMillimetres(1.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should identify \'medium\' for dimension with wider deviation tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.8, -1.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(0.79));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.79, -0.8));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.5, -2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });
        });

        describe('ISO 2768-c', () => {

            test('Should identify \'coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000), SymmetricalTolerance.fromMillimetres(2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.0, -2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with wider symmetrical tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), SymmetricalTolerance.fromMillimetres(3.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should identify \'coarse\' for dimension with wider deviation tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.0, -3.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(1.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.99, -2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(5.0, -4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });
        });

        describe('ISO 2768-v', () => {

            test('Should identify \'very coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000), SymmetricalTolerance.fromMillimetres(4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(4.0, -4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with wider symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), SymmetricalTolerance.fromMillimetres(5.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })

            test('Should identify \'very coarse\' for dimension with wider deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(700), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(4.0, -5.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(3.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(400.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(3.99, -4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })
        });
    });

    describe('Nominal size range from over 1000 mm up to 2000 mm', () => {

        describe('ISO 2768-f', () => {

            test('Should identify \'fine\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000), SymmetricalTolerance.fromMillimetres(0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.5, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should identify \'fine\' for dimension with wider symmetrical tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), SymmetricalTolerance.fromMillimetres(1.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should identify \'fine\' for dimension with wider deviation tolerance narrower than \'medium\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.5, -1.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(0.3));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });

            test('Should not identify \'fine\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(0.3, -0.5));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            })

            test('Should not identify \'fine\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.5, -1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
            });
        });

        describe('ISO 2768-m', () => {

            test('Should identify \'medium\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000), SymmetricalTolerance.fromMillimetres(1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.2, -1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with wider symmetrical tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), SymmetricalTolerance.fromMillimetres(2.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should identify \'medium\' for dimension with wider deviation tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.2, -2.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(1.19));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(3.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.19, -1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(3.5, -3.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });
        });

        describe('ISO 2768-c', () => {

            test('Should identify \'coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(3.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000), SymmetricalTolerance.fromMillimetres(3.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(3.0, -3.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with wider symmetrical tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), SymmetricalTolerance.fromMillimetres(5.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should identify \'coarse\' for dimension with wider deviation tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(3.0, -5.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(2.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(6.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.99, -3.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(7.0, -6.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });
        });

        describe('ISO 2768-v', () => {

            test('Should identify \'very coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(6.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000), SymmetricalTolerance.fromMillimetres(6.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(6.0, -6.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with wider symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), SymmetricalTolerance.fromMillimetres(7.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })

            test('Should identify \'very coarse\' for dimension with wider deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1500), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(6.0, -7.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(5.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(1000.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(5.99, -6.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })
        });
    });

    describe('Nominal size range from over 2000 mm up to 4000 mm', () => {

        // ISO 2768-f is not covered for this nominal size range.

        describe('ISO 2768-m', () => {

            test('Should identify \'medium\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), SymmetricalTolerance.fromMillimetres(2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(4000), SymmetricalTolerance.fromMillimetres(2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.0, -2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should identify \'medium\' for dimension with wider symmetrical tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), SymmetricalTolerance.fromMillimetres(3.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should identify \'medium\' for dimension with wider deviation tolerance narrower than \'coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(2.0, -3.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), SymmetricalTolerance.fromMillimetres(1.2));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });

            test('Should not identify \'medium\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), SymmetricalTolerance.fromMillimetres(4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(1.2, -2.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            })

            test('Should not identify \'medium\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(5.0, -4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('m'));
            });
        });

        describe('ISO 2768-c', () => {

            test('Should identify \'coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), SymmetricalTolerance.fromMillimetres(4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(4000), SymmetricalTolerance.fromMillimetres(4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(4.0, -4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should identify \'coarse\' for dimension with wider symmetrical tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), SymmetricalTolerance.fromMillimetres(7.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should identify \'coarse\' for dimension with wider deviation tolerance narrower than \'very coarse\'', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(4.0, -7.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), SymmetricalTolerance.fromMillimetres(3.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });

            test('Should not identify \'coarse\' for dimension with too wide symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), SymmetricalTolerance.fromMillimetres(8.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(3.99, -4.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            })

            test('Should not identify \'coarse\' for dimension with too wide deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(10.0, -8.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('c'));
            });
        });

        describe('ISO 2768-v', () => {

            test('Should identify \'very coarse\' for floor dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), SymmetricalTolerance.fromMillimetres(8.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for ceiling dimension with exact symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(4000), SymmetricalTolerance.fromMillimetres(8.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with exact deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(8.0, -8.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should identify \'very coarse\' for dimension with wider symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), SymmetricalTolerance.fromMillimetres(10.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })

            test('Should identify \'very coarse\' for dimension with wider deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(3000), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(8.0, -10.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight symmetrical tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), SymmetricalTolerance.fromMillimetres(7.99));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            });

            test('Should not identify \'very coarse\' for dimension with too tight deviation tolerance', () => {
                const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                    Dimension.fromMillimetres(2000.01), DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(7.99, -8.0));
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                expect(result).not.toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('v'));
            })
        });
    });
});