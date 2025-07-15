import {Tolerance} from "./Tolerance";
import {ToleranceWidth} from "./ToleranceWidth";

/**
 * Utility class for converting tolerances.
 */
export class ToleranceConverter {
    /**
     * Converts a tolerance to a tolerance width.
     *
     * @param tolerance the tolerance to convert.
     * @returns the tolerance width from the tolerance's upper and lower bound.
     */
    public static convertToleranceToToleranceWidth(tolerance: Tolerance): ToleranceWidth {
        return ToleranceWidth.fromMillimetres(tolerance.getUpper() - tolerance.getLower());
    }
}