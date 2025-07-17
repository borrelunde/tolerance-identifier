import {ToleranceStandardIdentifier} from "./ToleranceStandardIdentifier";
import {DimensionWithTolerance} from "./DimensionWithTolerance";
import {ToleranceStandard} from "./ToleranceStandard";

/**
 * A tolerance standard identifier that chains identifiers together. The order
 * of priority follows the order they were provided in the constructor. This
 * design follows the Chain of Responsibility pattern.
 *
 * The first identifier in the chain that can identify a tolerance standard
 * will return it, otherwise it will return null.
 */
export class ChainedToleranceStandardIdentifier implements ToleranceStandardIdentifier {

    /**
     * Creates a new instance of the ChainedToleranceStandardIdentifier with
     * the tolerance standard identifiers.
     *
     * Private constructor to enforce the use of the static factory method.
     *
     * @param identifiers the array of identifiers to chain together.
     */
    private constructor(private readonly identifiers: ReadonlyArray<ToleranceStandardIdentifier>) {
        // The field is assigned via a parameter property.
    }

    /**
     * Static factory method to create a new instance of the
     * ChainedToleranceStandardIdentifier with the provided identifiers. The
     * order of the identifiers determines the order of priority for
     * identification. The priority is "first come, first served".
     *
     * @param identifiers the array of identifiers to chain together.
     * @returns a new instance of ChainedToleranceStandardIdentifier.
     */
    static fromIdentifiers(identifiers: ReadonlyArray<ToleranceStandardIdentifier> = []): ChainedToleranceStandardIdentifier {
        return new ChainedToleranceStandardIdentifier(identifiers);
    }

    /**
     * Identifies the tolerance standard for the dimension with tolerance using
     * the chained identifiers. The first identifier that can identify a
     * tolerance standard will return it, otherwise it will return null.
     *
     * @param dimensionWithTolerance the dimension with its associated tolerance to be identified.
     * @returns the identified tolerance standard or null if none could be identified.
     */
    identifyToleranceStandard(dimensionWithTolerance: DimensionWithTolerance): ToleranceStandard | null {
        for (const identifier of this.identifiers) {
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimensionWithTolerance);
            if (result !== null) {
                return result;  // Return the first identified tolerance standard.
            }
        }
        return null;  // Otherwise, if no identifier found a match, return null.
    }
}