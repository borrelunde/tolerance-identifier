import {ToleranceStandardIdentifier} from "./ToleranceStandardIdentifier";
import {DimensionWithTolerance} from "./DimensionWithTolerance";
import {ToleranceStandard} from "./ToleranceStandard";
import {Dimension} from "./Dimension";
import {Tolerance} from "./Tolerance";
import {ISO_286_TABLE} from "./iso-286-table";
import {ToleranceWidth} from "./ToleranceWidth";
import {ToleranceConverter} from "./ToleranceConverter";
import {Iso286ToleranceStandard} from "./Iso286ToleranceStandard";

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
        const dimension: Dimension = dimensionWithTolerance.getDimension();
        const tolerance: Tolerance = dimensionWithTolerance.getTolerance();

        for (const range of ISO_286_TABLE) {
            // If the dimension is not within the nominal size range, skip to the next range.
            if (!range.nominalSizeRange.containsDimension(dimension)) {
                continue;
            }

            // Mapping tolerance grades to associated tolerance widths so that they can be iterated over readably in the
            // next step. The order of the grades is important. By starting with the widest width and going to the
            // narrower widths, it ensures that the widest appropriate tolerance grade is matched.
            const toleranceGrades: Array<{
                toleranceGrade: 'IT6' | 'IT7' | 'IT8' | 'IT9' | 'IT10',
                associatedToleranceWidth: ToleranceWidth | null
            }> = [
                {toleranceGrade: 'IT10', associatedToleranceWidth: range.IT10},
                {toleranceGrade: 'IT9', associatedToleranceWidth: range.IT9},
                {toleranceGrade: 'IT8', associatedToleranceWidth: range.IT8},
                {toleranceGrade: 'IT7', associatedToleranceWidth: range.IT7},
                {toleranceGrade: 'IT6', associatedToleranceWidth: range.IT6}
            ];

            // Iterating over the tolerance grades to find the widest one that covers the tolerance.
            for (const {toleranceGrade, associatedToleranceWidth} of toleranceGrades) {
                // The associated tolerance width may be null if the tolerance grade
                // is undefined for the current range. Skip in that case.
                if (associatedToleranceWidth === null) {
                    continue;
                }

                const toleranceWidth: ToleranceWidth = ToleranceConverter.convertToleranceToToleranceWidth(tolerance);
                const isWiderOrEqualToToleranceGrade: boolean = toleranceWidth.getWidthInMillimetres() >= associatedToleranceWidth.getWidthInMillimetres();

                if (isWiderOrEqualToToleranceGrade) {
                    return Iso286ToleranceStandard.fromToleranceGrade(toleranceGrade);
                }
            }
        }

        // If no matching tolerance standard and grade is found, return null indicating that none applies.
        return null;
    }
}