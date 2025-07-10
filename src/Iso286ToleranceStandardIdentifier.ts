import {ToleranceStandardIdentifier} from "./ToleranceStandardIdentifier";
import {DimensionWithTolerance} from "./DimensionWithTolerance";
import {ToleranceStandard} from "./ToleranceStandard";

/**
 * Tolerance standard identifier for ISO 286-1:2010.
 */
export class Iso286ToleranceStandardIdentifier implements ToleranceStandardIdentifier {

    /**
     * Identifies the widest appropriate ISO 286-1:2010 international tolerance
     * grade (IT grade) for a dimension with a tolerance.
     *
     * @param dimensionWithTolerance the dimension with its associated tolerance
     *                               to be identified.
     * @returns the ISO 286 tolerance standard and the identified IT grade or
     *          null if none applies.
     */
    identifyToleranceStandard(dimensionWithTolerance: DimensionWithTolerance): ToleranceStandard | null {
        return null;
    }
}