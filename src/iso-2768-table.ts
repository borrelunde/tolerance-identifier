import {DimensionRange} from "./DimensionRange";
import {Tolerance} from "./Tolerance";
import {SymmetricalTolerance} from "./SymmetricalTolerance";
import {Dimension} from "./Dimension";

/**
 * In ISO 2768-1:1989, the tolerances for linear dimensions are defined in ranges.
 * Each range has a nominal size (dimension range) and associated tolerances for
 * the classes.
 *
 * This is the representation of a range.
 */
export interface Iso2768DimensionRangeAndTolerances {
    nominalSizeRange: DimensionRange;
    fineTolerance: Tolerance | null;  // Fine tolerance may not be defined for all ranges.
    mediumTolerance: Tolerance;
    coarseTolerance: Tolerance;
    veryCoarseTolerance: Tolerance | null;  // Very coarse tolerance may not be defined for all ranges.
}

/**
 * A table for the linear dimensions in ISO 2768-1:1989. It defines the nominal
 * size ranges and the associated tolerances for each class.
 */
export const ISO_2768_TABLE: Iso2768DimensionRangeAndTolerances[] = [
    {
        nominalSizeRange: DimensionRange.fromAndUpTo(
            Dimension.fromMillimetres(0.5),
            Dimension.fromMillimetres(3)
        ),
        fineTolerance: SymmetricalTolerance.fromMillimetres(0.05),
        mediumTolerance: SymmetricalTolerance.fromMillimetres(0.1),
        coarseTolerance: SymmetricalTolerance.fromMillimetres(0.2),
        veryCoarseTolerance: null  // No very coarse tolerance for this range
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(3),
            Dimension.fromMillimetres(6)
        ),
        fineTolerance: SymmetricalTolerance.fromMillimetres(0.05),
        mediumTolerance: SymmetricalTolerance.fromMillimetres(0.1),
        coarseTolerance: SymmetricalTolerance.fromMillimetres(0.3),
        veryCoarseTolerance: SymmetricalTolerance.fromMillimetres(0.5)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(6),
            Dimension.fromMillimetres(30)
        ),
        fineTolerance: SymmetricalTolerance.fromMillimetres(0.1),
        mediumTolerance: SymmetricalTolerance.fromMillimetres(0.2),
        coarseTolerance: SymmetricalTolerance.fromMillimetres(0.5),
        veryCoarseTolerance: SymmetricalTolerance.fromMillimetres(1.0)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(30),
            Dimension.fromMillimetres(120)
        ),
        fineTolerance: SymmetricalTolerance.fromMillimetres(0.15),
        mediumTolerance: SymmetricalTolerance.fromMillimetres(0.3),
        coarseTolerance: SymmetricalTolerance.fromMillimetres(0.8),
        veryCoarseTolerance: SymmetricalTolerance.fromMillimetres(1.5)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(120),
            Dimension.fromMillimetres(400)
        ),
        fineTolerance: SymmetricalTolerance.fromMillimetres(0.2),
        mediumTolerance: SymmetricalTolerance.fromMillimetres(0.5),
        coarseTolerance: SymmetricalTolerance.fromMillimetres(1.2),
        veryCoarseTolerance: SymmetricalTolerance.fromMillimetres(2.5)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(400),
            Dimension.fromMillimetres(1000)
        ),
        fineTolerance: SymmetricalTolerance.fromMillimetres(0.3),
        mediumTolerance: SymmetricalTolerance.fromMillimetres(0.8),
        coarseTolerance: SymmetricalTolerance.fromMillimetres(2.0),
        veryCoarseTolerance: SymmetricalTolerance.fromMillimetres(4.0)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(1000),
            Dimension.fromMillimetres(2000)
        ),
        fineTolerance: SymmetricalTolerance.fromMillimetres(0.5),
        mediumTolerance: SymmetricalTolerance.fromMillimetres(1.2),
        coarseTolerance: SymmetricalTolerance.fromMillimetres(3.0),
        veryCoarseTolerance: SymmetricalTolerance.fromMillimetres(6.0)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(2000),
            Dimension.fromMillimetres(4000)
        ),
        fineTolerance: null, // No fine tolerance for this range
        mediumTolerance: SymmetricalTolerance.fromMillimetres(2.0),
        coarseTolerance: SymmetricalTolerance.fromMillimetres(4.0),
        veryCoarseTolerance: SymmetricalTolerance.fromMillimetres(8.0)
    }
];