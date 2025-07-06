import {DimensionWithTolerance} from "./DimensionWithTolerance";
import {ToleranceStandard} from "./ToleranceStandard";

/**
 * Tolerance Standard Identifier is an interface for identifiers for standards
 * such as ISO 2768-1:1989 and ISO 286-1:2010.
 */
export interface ToleranceStandardIdentifier {
    identifyToleranceStandard(dimensionWithTolerance: DimensionWithTolerance): ToleranceStandard | null;
}