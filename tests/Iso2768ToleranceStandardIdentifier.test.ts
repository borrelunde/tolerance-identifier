import {Iso2768ToleranceStandardIdentifier} from "../src/Iso2768ToleranceStandardIdentifier";
import {DimensionWithTolerance} from "../src/DimensionWithTolerance";
import {Dimension} from "../src/Dimension";
import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {ToleranceStandard} from "../src/ToleranceStandard";

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
});