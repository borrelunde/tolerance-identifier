import {ToleranceStandardIdentifier} from "./ToleranceStandardIdentifier";
import {Dimension} from "./Dimension";
import {Tolerance} from "./Tolerance";
import {DimensionWithTolerance} from "./DimensionWithTolerance";
import {ToleranceStandard} from "./ToleranceStandard";
import {ToleranceCoverageChecker} from "./ToleranceCoverageChecker";
import {Iso2768ToleranceStandard} from "./Iso2768ToleranceStandard";
import {ISO_2768_TABLE} from "./iso-2768-table";

/**
 * Tolerance standard identifier for ISO 2768-1:1989.
 */
export class Iso2768ToleranceStandardIdentifier implements ToleranceStandardIdentifier {

    /**
     * Identifies the widest appropriate ISO 2768-1:1989 tolerance standard for a dimension with a tolerance.
     *
     * @param dimensionWithTolerance the dimension with its associated tolerance to be identified.
     */
    identifyToleranceStandard(dimensionWithTolerance: DimensionWithTolerance): ToleranceStandard | null {
        const dimension: Dimension = dimensionWithTolerance.getDimension();
        const tolerance: Tolerance = dimensionWithTolerance.getTolerance();

        for (const range of ISO_2768_TABLE) {
            // If the dimension is not within the nominal size range, skip to the next range.
            if (!range.nominalSizeRange.containsDimension(dimension)) {
                continue;
            }

            // Mapping tolerance classes to associated tolerances so that we can iterate over them readably in the next
            // step. The order of the tolerance classes is important. By starting with the very coarse tolerance and
            // going to the fine tolerance, it ensures that the widest appropriate tolerance class is matched.
            const toleranceClasses: Array<{
                toleranceClass: 'f' | 'm' | 'c' | 'v',
                associatedTolerance: Tolerance | null
            }> = [
                {toleranceClass: 'v', associatedTolerance: range.veryCoarseTolerance},
                {toleranceClass: 'c', associatedTolerance: range.coarseTolerance},
                {toleranceClass: 'm', associatedTolerance: range.mediumTolerance},
                {toleranceClass: 'f', associatedTolerance: range.fineTolerance}
            ];

            // Iterating over the tolerance classes to find the widest one that covers the tolerance.
            for (const {toleranceClass, associatedTolerance} of toleranceClasses) {
                // The associated tolerance may be null if the tolerance class
                // is undefined for the current range. Skip in that case.
                if (associatedTolerance === null) {
                    continue;
                }
                // Check if the tolerance is covered by the tolerance of the tolerance class, return that class if so.
                if (ToleranceCoverageChecker.isToleranceCovered(tolerance, associatedTolerance)) {
                    return Iso2768ToleranceStandard.fromToleranceClass(toleranceClass);
                }
            }
        }

        // If no matching tolerance standard and class is found, return null indicating that none applies.
        return null;
    }
}