import {Dimension} from "./Dimension";
import {Tolerance} from "./Tolerance";

/**
 * Represents a dimension with a tolerance associated with it.
 */
export class DimensionWithTolerance {

    /**
     * Private constructor to enforce the use of the factory method.
     */
    private constructor(private readonly dimension: Dimension,
                        private readonly tolerance: Tolerance) {
        // The fields are assigned via parameter properties.
    }

    /**
     * Static factory method for constructing a DimensionWithTolerance from a
     * dimension and tolerance.
     *
     * @param dimension the dimension.
     * @param tolerance the associated tolerance.
     */
    static fromDimensionAndTolerance(dimension: Dimension, tolerance: Tolerance): DimensionWithTolerance {
        return new DimensionWithTolerance(dimension, tolerance);
    }

    getDimension(): Dimension {
        return this.dimension;
    }

    getTolerance(): Tolerance {
        return this.tolerance;
    }
}