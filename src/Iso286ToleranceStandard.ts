import {ToleranceStandard} from "./ToleranceStandard";

/**
 * Represents the ISO 286-1:2010 international tolerance grades. These are a
 * reduced set of tolerance grades for simplicity.
 */
export type Iso286ToleranceGrade = 'IT6' | 'IT7' | 'IT8' | 'IT9' | 'IT10';

/**
 * Represents the ISO 286-1:2010 tolerance standard.
 */
export class Iso286ToleranceStandard implements ToleranceStandard {

    /**
     * Private constructor to enforce the use of the static factory method.
     *
     * @param toleranceGrade the tolerance grade of the standard.
     */
    private constructor(private readonly toleranceGrade: Iso286ToleranceGrade) {
        // The field is assigned via a parameter property.
    }

    /**
     * Static factory method for constructing an ISO 286-1:2010 tolerance
     * standard from an ISO 286-1:2010 tolerance grade.
     *
     * @param toleranceGrade the tolerance grade of the standard.
     */
    static fromToleranceGrade(toleranceGrade: Iso286ToleranceGrade): Iso286ToleranceStandard {
        return new Iso286ToleranceStandard(toleranceGrade);
    }
    
    getToleranceGrade(): Iso286ToleranceGrade {
        return this.toleranceGrade;
    }
}