import {Tolerance} from "./Tolerance";

/**
 * Utility class that provides a method to check if one tolerance covers another.
 */
export class ToleranceCoverageChecker {

    /**
     * Checks if a tolerance is covered by another tolerance.
     *
     * A tolerance is considered covered if it's wider than or equal to the other
     * tolerance. Meaning its upper bound is greater than or equal to the other
     * tolerance's upper bound, and its lower bound is less than or equal to the
     * other tolerance's lower bound.
     *
     * For example, a tolerance of ±0.2 mm covers a tolerance of ±0.2 mm and ±0.3,
     * but not a tolerance of ±0.1 mm.
     *
     * @param candidate the tolerance being checked for coverage.
     * @param cover the tolerance that may cover the candidate tolerance.
     */
    static isToleranceCovered(candidate: Tolerance, cover: Tolerance): boolean {
        return candidate.getUpper() >= cover.getUpper() && candidate.getLower() <= cover.getLower();
    }
}