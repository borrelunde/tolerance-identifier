import {DimensionWithTolerance} from "./DimensionWithTolerance";
import {ToleranceStandard} from "./ToleranceStandard";
import {ToleranceStandardIdentifier} from "./ToleranceStandardIdentifier";

/**
 * Tolerance standard identifier for ISO 2768-1:1989.
 */
export class Iso2768ToleranceStandardIdentifier implements ToleranceStandardIdentifier {

    identifyToleranceStandard(dimensionWithTolerance: DimensionWithTolerance): ToleranceStandard | null {
        return null;
    }
}