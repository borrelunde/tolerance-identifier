import {ToleranceStandard} from "./ToleranceStandard";

/**
 * Represents the four possible tolerance classes for ISO 2768-1:1989:
 * - f (fine)
 * - m (medium)
 * - c (coarse)
 * - v (very coarse)
 */
export type Iso2768ToleranceClass = 'f' | 'm' | 'c' | 'v';

/**
 * Represents the ISO 2768-1:1989 tolerance standard.
 */
export class Iso2768ToleranceStandard implements ToleranceStandard {

    /**
     * Private constructor to enforce the use of the static factory method.
     *
     * @param toleranceClass the tolerance class of the standard.
     */
    private constructor(private readonly toleranceClass: Iso2768ToleranceClass) {
        // The field is assigned via a parameter property.
    }

    /**
     * Static factory method for constructing an ISO 2768-1:1989 tolerance
     * standard from an ISO 2768-1:1989 tolerance class.
     *
     * @param toleranceClass the tolerance class of the standard.
     */
    static fromToleranceClass(toleranceClass: Iso2768ToleranceClass): Iso2768ToleranceStandard {
        return new Iso2768ToleranceStandard(toleranceClass);
    }

    getToleranceClass(): Iso2768ToleranceClass {
        return this.toleranceClass;
    }
}