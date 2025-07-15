/**
 * A tolerance width is the exact difference between the upper and lower bounds
 * of a tolerance. In the tolerance standard ISO 286, the tolerance values are
 * tolerance widths.
 */
export class ToleranceWidth {
    /**
     * Creates a ToleranceWidth from a width in millimetres.
     *
     * It is private to enforce the use of the static factory methods.
     *
     * @param width the width in millimetres.
     */
    private constructor(private readonly width: number) {
        // The field is assigned via a parameter property.
        // Guard against infinite or NaN widths.
        if (!Number.isFinite(width)) {
            throw new RangeError('Tolerance width must be a finite number');
        }
        // Guard against negative widths.
        if (width < 0) {
            throw new RangeError('Tolerance width cannot be negative');
        }
    }

    /**
     * Creates a ToleranceWidth from a width in millimetres.
     *
     * @param width the width in millimetres.
     */
    static fromMillimetres(width: number): ToleranceWidth {
        return new ToleranceWidth(width);
    }

    /**
     * Creates a ToleranceWidth from a width in micrometres.
     *
     * @param width the width in micrometres.
     */
    static fromMicrometres(width: number): ToleranceWidth {
        return new ToleranceWidth(width * 0.001);  // Convert micrometres to millimetres.
    }

    getWidthInMillimetres(): number {
        return this.width;
    }
}