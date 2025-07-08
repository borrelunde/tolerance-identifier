import {Iso2768ToleranceStandardIdentifier} from "../src/Iso2768ToleranceStandardIdentifier";
import {DimensionWithTolerance} from "../src/DimensionWithTolerance";
import {Dimension} from "../src/Dimension";
import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {ToleranceStandard} from "../src/ToleranceStandard";
import {Iso2768ToleranceStandard} from "../src/Iso2768ToleranceStandard";

describe('ISO 2768-1 Tolerance Standard Identifier', () => {

    const identifier: Iso2768ToleranceStandardIdentifier = new Iso2768ToleranceStandardIdentifier();

    describe('With edge cases', () => {
        test('Should not identify a tolerance standard for a dimension less than the nominal range', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(0.4),
                SymmetricalTolerance.fromMillimetres(0.0)  // The tolerance is irrelevant in this case.
            );
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toBeNull();
        });

        test('Should not identify a tolerance standard for a dimension greater than the nominal range', () => {
            const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(4001),
                SymmetricalTolerance.fromMillimetres(0.0)  // The tolerance is irrelevant in this case.
            );
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
            expect(result).toBeNull();
        })
    });

    // Use the tolerance table for linear dimensions in the ISO 2768-1:1989
    // documentation as reference: docs/iso-2768-1-1989.md
    const iso2768fTestGroups = [
        {
            // Dimensions that are the lowest in the nominal size range for fine tolerance.
            type: 'Floor dimensions',
            cases: [
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(0.5), SymmetricalTolerance.fromMillimetres(0.05)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(3.01), SymmetricalTolerance.fromMillimetres(0.05)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(6.01), SymmetricalTolerance.fromMillimetres(0.1)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(30.01), SymmetricalTolerance.fromMillimetres(0.15)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(120.01), SymmetricalTolerance.fromMillimetres(0.2)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(400.01), SymmetricalTolerance.fromMillimetres(0.3)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(1000.01), SymmetricalTolerance.fromMillimetres(0.5))
                // No tolerance for fine for over 2000 up to 4000.
            ]
        },
        {
            // Dimensions that are the highest in the nominal size range for fine tolerance.
            type: 'Ceiling dimensions',
            cases: [
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(3), SymmetricalTolerance.fromMillimetres(0.05)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(6), SymmetricalTolerance.fromMillimetres(0.05)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(30), SymmetricalTolerance.fromMillimetres(0.1)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(120), SymmetricalTolerance.fromMillimetres(0.15)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(400), SymmetricalTolerance.fromMillimetres(0.2)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(1000), SymmetricalTolerance.fromMillimetres(0.3)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(2000), SymmetricalTolerance.fromMillimetres(0.5))
                // No tolerance for fine for over 2000 up to 4000.
            ]
        },
        {
            // Tolerances that are just below the medium tolerance class.
            type: 'Ceiling tolerances',
            cases: [
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(1), SymmetricalTolerance.fromMillimetres(0.1 - 0.01)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(4), SymmetricalTolerance.fromMillimetres(0.1 - 0.01)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(10), SymmetricalTolerance.fromMillimetres(0.2 - 0.01)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(50), SymmetricalTolerance.fromMillimetres(0.3 - 0.01)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(200), SymmetricalTolerance.fromMillimetres(0.5 - 0.01)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(800), SymmetricalTolerance.fromMillimetres(0.8 - 0.01)),
                DimensionWithTolerance.fromDimensionAndTolerance(Dimension.fromMillimetres(1500), SymmetricalTolerance.fromMillimetres(1.2 - 0.01))
                // No tolerance for fine over 2000 up to 4000.
            ]
        }
    ];

    describe('ISO 2768-f tests', () => {
        iso2768fTestGroups.forEach(group => {
            describe(group.type, () => {
                test.each(group.cases)(`should identify ISO 2768-f for %s`, (dimensionWithTolerance: DimensionWithTolerance) => {
                        const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimensionWithTolerance);
                        expect(result).toStrictEqual(Iso2768ToleranceStandard.fromToleranceClass('f'));
                    }
                );
            });
        });
    });
});