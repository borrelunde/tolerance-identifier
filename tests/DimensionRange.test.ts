import {DimensionRange} from "../src/DimensionRange";
import {Dimension} from "../src/Dimension";

describe('DimensionRange', () => {

    describe('from-and-up-to', () => {

        test('Should not contain a dimension less than the lower bound', () => {
            const range = DimensionRange.fromAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(0.5);
            expect(range.containsDimension(dimension)).toBe(false);
        });

        test('Should contain a dimension equal to the lower bound', () => {
            const range = DimensionRange.fromAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(1.0);
            expect(range.containsDimension(dimension)).toBe(true);
        });

        test('Should contain a dimension between the lower bound and upper bound', () => {
            const range = DimensionRange.fromAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(1.5);
            expect(range.containsDimension(dimension)).toBe(true);
        });

        test('Should contain a dimension equal to the upper bound', () => {
            const range = DimensionRange.fromAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(2.0);
            expect(range.containsDimension(dimension)).toBe(true);
        });

        test('Should not contain a dimension greater than the upper bound', () => {
            const range = DimensionRange.fromAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(2.5);
            expect(range.containsDimension(dimension)).toBe(false);
        });
    });

    describe('from-over-and-up-to', () => {

        test('Should not contain a dimension less than the lower bound', () => {
            const range = DimensionRange.fromOverAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(0.5);
            expect(range.containsDimension(dimension)).toBe(false);
        });

        test('Should not contain a dimension equal to the lower bound', () => {
            const range = DimensionRange.fromOverAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(1.0);
            expect(range.containsDimension(dimension)).toBe(false);
        });

        test('Should contain a dimension between the lower bound and upper bound', () => {
            const range = DimensionRange.fromOverAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(1.5);
            expect(range.containsDimension(dimension)).toBe(true);
        });

        test('Should contain a dimension equal to the upper bound', () => {
            const range = DimensionRange.fromOverAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(2.0);
            expect(range.containsDimension(dimension)).toBe(true);
        });

        test('Should not contain a dimension greater than the upper bound', () => {
            const range = DimensionRange.fromOverAndUpTo(
                Dimension.fromMillimetres(1.0),
                Dimension.fromMillimetres(2.0)
            );
            const dimension = Dimension.fromMillimetres(2.5);
            expect(range.containsDimension(dimension)).toBe(false);
        });
    });
});