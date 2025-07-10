import {Iso286ToleranceStandardIdentifier} from "../src/Iso286ToleranceStandardIdentifier";
import {DimensionWithTolerance} from "../src/DimensionWithTolerance";
import {Dimension} from "../src/Dimension";
import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {ToleranceStandard} from "../src/ToleranceStandard";

describe('ISO 286-1 Tolerance Standard Identifier', () => {

    const identifier = new Iso286ToleranceStandardIdentifier();

    describe('Edge cases', () => {

        test('Should not identify a tolerance standard for a dimension less than the nominal range', () => {
            const dimensionWithTolerance: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(-0.1), SymmetricalTolerance.fromMillimetres(0.0));  // The tolerance is irrelevant.
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimensionWithTolerance);
            expect(result).toBeNull();
        });

        test('Should not identify a tolerance standard for a dimension greater than the nominal range', () => {
            const dimensionWithTolerance: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(3150.1), SymmetricalTolerance.fromMillimetres(0.0));  // The tolerance is irrelevant.
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimensionWithTolerance);
            expect(result).toBeNull();
        });
    });
});