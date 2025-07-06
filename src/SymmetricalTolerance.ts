import {Tolerance} from "./Tolerance";

/**
 * Represents a tolerance with equal upper and lower bounds, but opposite
 * signs. For example, ±0.2 mm.
 */
export class SymmetricalTolerance implements Tolerance {

    /**
     * Private constructor to enforce the use of the factory method.
     *
     * @param mm the symmetrical tolerance in millimetres.
     */
    private constructor(private readonly mm: number) {
        // The field is assigned via a parameter property.
    }

    /**
     * Static factory method for constructing a symmetrical tolerance from
     * millimetres.
     *
     * @param mm the symmetrical upper and lower tolerance in millimetres.
     * @throws Error if mm is not a finite number, for example, NaN or Infinity.
     */
    static fromMillimetres(mm: number): SymmetricalTolerance {
        if (!Number.isFinite(mm)) {
            throw new Error("Tolerance must be a finite number.");
        }
        // Using absolute to ensure the tolerance is always positive.
        return new SymmetricalTolerance(Math.abs(mm));
    }

    getUpper(): number {
        return this.mm;
    }

    getLower(): number {
        return -this.mm;
    }
}