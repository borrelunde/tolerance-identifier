import {Tolerance} from "./Tolerance";

/**
 * Represents a tolerance with separate upper and lower bounds. For example,
 * an upper bound of 0.2 mm and a lower bound of -0.1 mm.
 */
export class DeviationTolerance implements Tolerance {

    /**
     * Private constructor to enforce the use of the factory method.
     *
     * @param upper the upper bound of the tolerance in millimetres.
     * @param lower the lower bound of the tolerance in millimetres.
     * @throws Error if either the upper or the lower bound is not finite.
     * @throws Error if the upper bound is less than the lower bound.
     */
    private constructor(private readonly upper: number, private readonly lower: number) {
        // The fields are assigned via parameter properties.
        // Guard against invalid inputs.
        if (!Number.isFinite(upper) || !Number.isFinite(lower)) {
            throw new Error("Both upper and lower bounds must be finite numbers.");
        }
        // Ensure that the upper bound is greater than or equal to the lower bound.
        if (upper < lower) {
            throw new Error("Upper bound must be greater than or equal to lower bound.");
        }
    }

    /**
     * Static factory method for constructing a deviation tolerance from upper
     * and lower bounds in millimetres.
     *
     * @param upper the upper bound of the tolerance in millimetres.
     * @param lower the lower bound of the tolerance in millimetres.
     */
    static fromUpperAndLowerBoundsInMillimetres(upper: number, lower: number): DeviationTolerance {
        return new DeviationTolerance(upper, lower);
    }

    getUpper(): number {
        return this.upper;
    }

    getLower(): number {
        return this.lower;
    }
}