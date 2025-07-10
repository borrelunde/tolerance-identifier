import {Dimension} from "../src/Dimension";
import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {DimensionWithTolerance} from "../src/DimensionWithTolerance";

describe("Dimension With Tolerance", () => {

    describe('When constructing with factory method', () => {

        test('Dimension getter should return the dimension', () => {
            const dimension: Dimension = Dimension.fromMillimetres(1.0);
            const tolerance: SymmetricalTolerance = SymmetricalTolerance.fromMillimetres(0.0);  // The tolerance is irrelevant but needed for construction.
            const dimensionWithTolerance: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(dimension, tolerance);
            expect(dimensionWithTolerance.getDimension()).toBe(dimension);
        });

        test('Tolerance getter should return the tolerance', () => {
            const dimension: Dimension = Dimension.fromMillimetres(0.0);  // The dimension is irrelevant but needed for construction.
            const tolerance: SymmetricalTolerance = SymmetricalTolerance.fromMillimetres(0.2);
            const dimensionWithTolerance: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(dimension, tolerance);
            expect(dimensionWithTolerance.getTolerance()).toBe(tolerance);
        });
    });
});