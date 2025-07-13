import {Dimension} from './Dimension';

/**
 * Represents a dimensional range with a lower and upper bound. It is used to
 * check if a dimension is within the range. However, since that check is
 * different depending on the context, a strategy is used to determine that,
 * so that it's straightforward to adjust.
 */
export class DimensionRange {

    /**
     * Private constructor to enforce the use of the static factory methods.
     *
     * @param lower the lower-bound dimension of the range.
     * @param upper the upper-bound dimension of the range.
     * @param strategy the containment strategy for checking if a dimension is
     *                 within the range.
     */
    private constructor(private readonly lower: Dimension,
                        private readonly upper: Dimension,
                        private readonly strategy: ContainmentStrategy) {
        // The fields are assigned via parameter properties.
    }

    /**
     * Creates a DimensionRange with both lower and upper bounds inclusive.
     * Dimensions equal to the lower or upper bound are considered within the
     * range.
     *
     * @param lower the inclusive lower-bound dimension of the range.
     * @param upper the inclusive upper-bound dimension of the range.
     */
    static fromAndUpTo(lower: Dimension, upper: Dimension): DimensionRange {
        return new DimensionRange(lower, upper, new LowerBoundInclusiveContainmentStrategy());
    }

    /**
     * Creates a DimensionRange with an exclusive lower bound and inclusive
     * upper bound. Dimensions greater than the lower bound and equal to or less
     * than the upper bound are considered within the range.
     *
     * @param lower the exclusive lower-bound dimension of the range.
     * @param upper the inclusive upper-bound dimension of the range.
     */
    static fromOverAndUpTo(lower: Dimension, upper: Dimension): DimensionRange {
        return new DimensionRange(lower, upper, new LowerBoundExclusiveContainmentStrategy());
    }

    containsDimension(dimension: Dimension): boolean {
        return this.strategy.containsDimension(dimension, this.lower, this.upper);
    }

    getUpperBound() {
        return this.upper;
    }

    getLowerBound() {
        return this.lower;
    }
}

/**
 * Interface for containment strategies used to determine if a dimension is
 * within a range of lower and upper dimensional bounds.
 */
interface ContainmentStrategy {
    containsDimension(dimension: Dimension, from: Dimension, to: Dimension): boolean;
}

/**
 * Containment strategy where the lower and upper bound is inclusive. A
 * dimension is within the range if it is greater than or equal to the lower
 * bound and less than or equal to the upper bound.
 */
class LowerBoundInclusiveContainmentStrategy implements ContainmentStrategy {
    containsDimension(dimension: Dimension, lower: Dimension, upper: Dimension): boolean {
        return dimension.greaterThanOrEqual(lower) && dimension.lessThanOrEqual(upper);
    }
}

/**
 * Containment strategy where the lower bound is exclusive and the upper bound
 * is inclusive. A dimension is within the range if it is greater than the lower
 * bound and less than or equal to the upper bound.
 */
class LowerBoundExclusiveContainmentStrategy implements ContainmentStrategy {
    containsDimension(dimension: Dimension, lower: Dimension, upper: Dimension): boolean {
        return dimension.greaterThan(lower) && dimension.lessThanOrEqual(upper);
    }
}