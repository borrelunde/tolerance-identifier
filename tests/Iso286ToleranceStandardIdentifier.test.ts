import {Iso286ToleranceStandardIdentifier} from "../src/Iso286ToleranceStandardIdentifier";
import {Dimension} from "../src/Dimension";
import {DimensionWithTolerance} from "../src/DimensionWithTolerance";
import {DimensionRange} from "../src/DimensionRange";
import {Tolerance} from "../src/Tolerance";
import {ToleranceWidth} from "../src/ToleranceWidth";
import {DeviationTolerance} from "../src/DeviationTolerance";
import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {ToleranceStandard} from "../src/ToleranceStandard";
import {Iso286ToleranceGrade, Iso286ToleranceStandard} from "../src/Iso286ToleranceStandard";

/**
 * Helper interface for the ISO 286 table rows. This is the tolerance grade
 * and width for each nominal size range.
 */
interface ToleranceGradeAndWidth {
    grade: Iso286ToleranceGrade,
    width: ToleranceWidth
}

/**
 * An interface for the ISO 286 table rows. Makes it easy to set up the full
 * table. An array of tolerance grades and widths is used instead of fixed
 * properties for each grade, since not all grades are defined for all ranges.
 */
interface Iso286TableRow {
    nominalSizeRange: DimensionRange,
    toleranceGradesAndWidths: ToleranceGradeAndWidth[]
}

/**
 * A table for the International Tolerance (IT) Grades in ISO 286-1:2010. It
 * defines the nominal size ranges and the associated tolerance widths for each
 * tolerance grade.
 *
 * This is nearly a duplicate of the ISO 286 table in iso-286-table.ts, with a
 * different structure. This structure might be adopted in that table. However,
 * there is a point that there should be a separate "source of truth" for the
 * tests. Even so, maybe things will be adjusted later.
 */
const iso286Table: Iso286TableRow[] = [
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(0.0),
            Dimension.fromMillimetres(3.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(6)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(10)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(14)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(25)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(40)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(3.0),
            Dimension.fromMillimetres(6.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(8)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(12)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(18)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(30)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(48)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(6.0),
            Dimension.fromMillimetres(10.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(9)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(15)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(22)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(36)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(58)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(10.0),
            Dimension.fromMillimetres(18.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(11)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(18)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(27)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(43)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(70)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(18.0),
            Dimension.fromMillimetres(30.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(13)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(21)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(33)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(52)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(84)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(30.0),
            Dimension.fromMillimetres(50.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(16)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(25)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(39)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(62)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(100)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(50.0),
            Dimension.fromMillimetres(80.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(19)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(30)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(46)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(74)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(120)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(80.0),
            Dimension.fromMillimetres(120.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(23)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(35)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(54)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(87)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(140)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(120.0),
            Dimension.fromMillimetres(180.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(27)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(40)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(63)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(97)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(155)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(180.0),
            Dimension.fromMillimetres(250.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(29)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(46)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(72)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(115)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(185)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(250.0),
            Dimension.fromMillimetres(315.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(32)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(52)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(81)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(130)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(210)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(315.0),
            Dimension.fromMillimetres(400.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(36)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(57)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(89)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(140)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(230)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(400.0),
            Dimension.fromMillimetres(500.0)
        ),
        toleranceGradesAndWidths: [
            {
                grade: 'IT6',
                width: ToleranceWidth.fromMicrometres(40)
            },
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(63)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(97)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(155)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(250)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(500.0),
            Dimension.fromMillimetres(630.0)
        ),
        toleranceGradesAndWidths: [
            // IT6 is not defined for this range.
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(70)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(110)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(175)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(280)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(630.0),
            Dimension.fromMillimetres(800.0)
        ),
        toleranceGradesAndWidths: [
            // IT6 is not defined for this range.
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(80)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(125)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(200)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(320)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(800.0),
            Dimension.fromMillimetres(1000.0)
        ),
        toleranceGradesAndWidths: [
            // IT6 is not defined for this range.
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(90)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(140)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(230)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(360)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(1000.0),
            Dimension.fromMillimetres(1250.0)
        ),
        toleranceGradesAndWidths: [
            // IT6 is not defined for this range.
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(105)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(165)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(260)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(420)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(1250.0),
            Dimension.fromMillimetres(1600.0)
        ),
        toleranceGradesAndWidths: [
            // IT6 is not defined for this range.
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(125)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(195)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(310)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(500)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(1600.0),
            Dimension.fromMillimetres(2000.0)
        ),
        toleranceGradesAndWidths: [
            // IT6 is not defined for this range.
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(150)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(230)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(370)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(600)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(2000.0),
            Dimension.fromMillimetres(2500.0)
        ),
        toleranceGradesAndWidths: [
            // IT6 is not defined for this range.
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(175)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(280)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(440)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(700)
            }
        ]
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(2500.0),
            Dimension.fromMillimetres(3150.0)
        ),
        toleranceGradesAndWidths: [
            // IT6 is not defined for this range.
            {
                grade: 'IT7',
                width: ToleranceWidth.fromMicrometres(210)
            },
            {
                grade: 'IT8',
                width: ToleranceWidth.fromMicrometres(330)
            },
            {
                grade: 'IT9',
                width: ToleranceWidth.fromMicrometres(540)
            },
            {
                grade: 'IT10',
                width: ToleranceWidth.fromMicrometres(860)
            }
        ]
    }
];

describe('ISO 286-1 Tolerance Standard Identifier', () => {

    const identifier = new Iso286ToleranceStandardIdentifier();

    describe('Edge cases', () => {

        test('Should not identify a tolerance standard for a dimension less than the nominal range', () => {
            // The tolerance has to match a potential width had the dimension been within range.
            const dimensionWithTolerance: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(0.0), SymmetricalTolerance.fromMillimetres(0.005));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimensionWithTolerance);
            expect(result).toBeNull();
        });

        test('Should not identify a tolerance standard for a dimension greater than the nominal range', () => {
            // The tolerance has to match a potential width had the dimension been within range.
            const dimensionWithTolerance: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(
                Dimension.fromMillimetres(3150.1), SymmetricalTolerance.fromMillimetres(1));
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimensionWithTolerance);
            expect(result).toBeNull();
        });
    });

    // Iterate over the ISO 286 table and test each nominal size range with its tolerance grade and width.
    iso286Table.forEach((iso286TableRow: Iso286TableRow) => {

        const dimensionRange: DimensionRange = iso286TableRow.nominalSizeRange;
        const toleranceGradesAndWidths: ToleranceGradeAndWidth[] = iso286TableRow.toleranceGradesAndWidths;

        const lowerBoundMillimetres = dimensionRange.getLowerBound().getMillimetres();
        const upperBoundMillimetres = dimensionRange.getUpperBound().getMillimetres();

        describe(`Nominal size range from ${lowerBoundMillimetres} mm up to and including ${upperBoundMillimetres} mm`, () => {

            // An indexed loop is used because the next tolerance grade is needed. It's easy to access it that way.
            for (let i = 0; i < toleranceGradesAndWidths.length; i++) {

                // The last tolerance grade is not followed by another grade, so it is handled a little differently
                // when it comes to the ceiling tolerance. The last tolerance grade's "ceiling tolerance width" is
                // infinite.

                // Determines if the current tolerance grade is not the last one in the list.
                const isNotLastToleranceGrade: boolean = i < toleranceGradesAndWidths.length - 1;

                const toleranceGradeAndWidth: ToleranceGradeAndWidth = toleranceGradesAndWidths[i];
                const toleranceGrade: Iso286ToleranceGrade = toleranceGradeAndWidth.grade;
                const toleranceWidth: ToleranceWidth = toleranceGradeAndWidth.width;

                // The floor dimension is always just above the lower bound. That's why one micrometre is added.
                const floorDimension = Dimension.fromMillimetres(lowerBoundMillimetres + 0.001);
                const ceilingDimension = Dimension.fromMillimetres(upperBoundMillimetres);

                // Deviation tolerances makes it easy to work with the upper and lower bounds using zero for the
                // lower bound and the tolerance width for the upper bound. For the ceiling tolerance, the upper
                // bound is the next tolerance grade's width minus one micrometre, or "infinite" for the last grade.
                const floorTolerance = DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(toleranceWidth.getWidthInMillimetres(), 0);
                const nextToleranceGradeAndWidth: ToleranceGradeAndWidth = toleranceGradesAndWidths[i + 1];
                const ceilingTolerance = isNotLastToleranceGrade
                    ? DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(nextToleranceGradeAndWidth.width.getWidthInMillimetres() - 0.001, 0)
                    : DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(Number.MAX_VALUE, 0);

                test(`Should identify ${toleranceGrade} for floor dimension with floor tolerance width`, () => {
                    const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(floorDimension, floorTolerance);
                    const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                    expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade(toleranceGrade));
                });

                test(`Should identify ${toleranceGrade} for floor dimension with ceiling tolerance width`, () => {
                    const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(floorDimension, ceilingTolerance);
                    const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                    expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade(toleranceGrade));
                });

                test(`Should identify ${toleranceGrade} for ceiling dimension with floor tolerance width`, () => {
                    const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(ceilingDimension, floorTolerance);
                    const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                    expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade(toleranceGrade));
                });

                test(`Should identify ${toleranceGrade} for ceiling dimension with ceiling tolerance width`, () => {
                    const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(ceilingDimension, ceilingTolerance);
                    const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                    expect(result).toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade(toleranceGrade));
                });

                test(`Should not identify ${toleranceGrade} for tolerance width less than tolerance grade`, () => {
                    const belowTolerance: Tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(toleranceWidth.getWidthInMillimetres() - 0.001, 0);
                    const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(floorDimension, belowTolerance);
                    const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                    expect(result).not.toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade(toleranceGrade));
                });

                if (isNotLastToleranceGrade) {
                    test(`Should not identify ${toleranceGrade} for tolerance width greater than ${toleranceGrade}`, () => {
                        const aboveTolerance: Tolerance = DeviationTolerance.fromUpperAndLowerBoundsInMillimetres(
                            nextToleranceGradeAndWidth.width.getWidthInMillimetres(), 0);
                        const dimension: DimensionWithTolerance = DimensionWithTolerance.fromDimensionAndTolerance(floorDimension, aboveTolerance);
                        const result: ToleranceStandard | null = identifier.identifyToleranceStandard(dimension);
                        expect(result).not.toStrictEqual(Iso286ToleranceStandard.fromToleranceGrade(toleranceGrade));
                    });
                }
            }
        });
    });
});