import {DimensionWithTolerance} from "./DimensionWithTolerance";
import {ToleranceStandard} from "./ToleranceStandard";

export interface ToleranceStandardIdentifier {
    identifyToleranceStandard(dimensionWithTolerance: DimensionWithTolerance): ToleranceStandard | null;
}