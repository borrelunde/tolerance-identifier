import {DimensionRange} from "./DimensionRange";
import {ToleranceWidth} from "./ToleranceWidth";
import {Dimension} from "./Dimension";

/**
 * Represents a row in the International Tolerance Grade table for ISO
 * 286-1:2010. It defines the nominal size range (dimension range) and the
 * associated tolerance grades' tolerance widths.
 *
 * To keep things simple, only some convenient tolerance grades are covered.
 */
export interface Iso286DimensionRangeAndTolerances {
    nominalSizeRange: DimensionRange,
    IT6: ToleranceWidth | null,  // IT6 is not defined for all ranges.
    IT7: ToleranceWidth,
    IT8: ToleranceWidth,
    IT9: ToleranceWidth,
    IT10: ToleranceWidth
}

/**
 * A table for the International Tolerance (IT) Grades in ISO 286-1:2010. It
 * defines the nominal size ranges and the associated tolerance widths for each
 * tolerance grade.
 *
 * To keep things simple, only the tolerance grades IT6 to IT10 are covered.
 */
export const ISO_286_TABLE: Iso286DimensionRangeAndTolerances[] = [
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(0.0),
            Dimension.fromMillimetres(3.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(6),
        IT7: ToleranceWidth.fromMicrometres(10),
        IT8: ToleranceWidth.fromMicrometres(14),
        IT9: ToleranceWidth.fromMicrometres(25),
        IT10: ToleranceWidth.fromMicrometres(40)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(3.0),
            Dimension.fromMillimetres(6.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(8),
        IT7: ToleranceWidth.fromMicrometres(12),
        IT8: ToleranceWidth.fromMicrometres(18),
        IT9: ToleranceWidth.fromMicrometres(30),
        IT10: ToleranceWidth.fromMicrometres(48)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(6.0),
            Dimension.fromMillimetres(10.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(9),
        IT7: ToleranceWidth.fromMicrometres(15),
        IT8: ToleranceWidth.fromMicrometres(22),
        IT9: ToleranceWidth.fromMicrometres(36),
        IT10: ToleranceWidth.fromMicrometres(58)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(10.0),
            Dimension.fromMillimetres(18.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(11),
        IT7: ToleranceWidth.fromMicrometres(18),
        IT8: ToleranceWidth.fromMicrometres(27),
        IT9: ToleranceWidth.fromMicrometres(43),
        IT10: ToleranceWidth.fromMicrometres(70)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(18.0),
            Dimension.fromMillimetres(30.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(13),
        IT7: ToleranceWidth.fromMicrometres(21),
        IT8: ToleranceWidth.fromMicrometres(33),
        IT9: ToleranceWidth.fromMicrometres(52),
        IT10: ToleranceWidth.fromMicrometres(84)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(30.0),
            Dimension.fromMillimetres(50.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(16),
        IT7: ToleranceWidth.fromMicrometres(25),
        IT8: ToleranceWidth.fromMicrometres(39),
        IT9: ToleranceWidth.fromMicrometres(62),
        IT10: ToleranceWidth.fromMicrometres(100)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(50.0),
            Dimension.fromMillimetres(80.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(19),
        IT7: ToleranceWidth.fromMicrometres(30),
        IT8: ToleranceWidth.fromMicrometres(46),
        IT9: ToleranceWidth.fromMicrometres(74),
        IT10: ToleranceWidth.fromMicrometres(120)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(80.0),
            Dimension.fromMillimetres(120.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(23),
        IT7: ToleranceWidth.fromMicrometres(35),
        IT8: ToleranceWidth.fromMicrometres(54),
        IT9: ToleranceWidth.fromMicrometres(87),
        IT10: ToleranceWidth.fromMicrometres(140)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(120.0),
            Dimension.fromMillimetres(180.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(27),
        IT7: ToleranceWidth.fromMicrometres(40),
        IT8: ToleranceWidth.fromMicrometres(63),
        IT9: ToleranceWidth.fromMicrometres(97),
        IT10: ToleranceWidth.fromMicrometres(155)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(180.0),
            Dimension.fromMillimetres(250.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(29),
        IT7: ToleranceWidth.fromMicrometres(46),
        IT8: ToleranceWidth.fromMicrometres(72),
        IT9: ToleranceWidth.fromMicrometres(115),
        IT10: ToleranceWidth.fromMicrometres(185)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(250.0),
            Dimension.fromMillimetres(315.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(32),
        IT7: ToleranceWidth.fromMicrometres(52),
        IT8: ToleranceWidth.fromMicrometres(81),
        IT9: ToleranceWidth.fromMicrometres(130),
        IT10: ToleranceWidth.fromMicrometres(210)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(315.0),
            Dimension.fromMillimetres(400.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(36),
        IT7: ToleranceWidth.fromMicrometres(57),
        IT8: ToleranceWidth.fromMicrometres(89),
        IT9: ToleranceWidth.fromMicrometres(140),
        IT10: ToleranceWidth.fromMicrometres(230)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(400.0),
            Dimension.fromMillimetres(500.0)
        ),
        IT6: ToleranceWidth.fromMicrometres(40),
        IT7: ToleranceWidth.fromMicrometres(63),
        IT8: ToleranceWidth.fromMicrometres(97),
        IT9: ToleranceWidth.fromMicrometres(155),
        IT10: ToleranceWidth.fromMicrometres(250)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(500.0),
            Dimension.fromMillimetres(630.0)
        ),
        IT6: null,
        IT7: ToleranceWidth.fromMicrometres(70),
        IT8: ToleranceWidth.fromMicrometres(110),
        IT9: ToleranceWidth.fromMicrometres(175),
        IT10: ToleranceWidth.fromMicrometres(280)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(630.0),
            Dimension.fromMillimetres(800.0)
        ),
        IT6: null,
        IT7: ToleranceWidth.fromMicrometres(80),
        IT8: ToleranceWidth.fromMicrometres(125),
        IT9: ToleranceWidth.fromMicrometres(200),
        IT10: ToleranceWidth.fromMicrometres(320)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(800.0),
            Dimension.fromMillimetres(1000.0)
        ),
        IT6: null,
        IT7: ToleranceWidth.fromMicrometres(90),
        IT8: ToleranceWidth.fromMicrometres(140),
        IT9: ToleranceWidth.fromMicrometres(230),
        IT10: ToleranceWidth.fromMicrometres(360)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(1000.0),
            Dimension.fromMillimetres(1250.0)
        ),
        IT6: null,
        IT7: ToleranceWidth.fromMicrometres(105),
        IT8: ToleranceWidth.fromMicrometres(165),
        IT9: ToleranceWidth.fromMicrometres(260),
        IT10: ToleranceWidth.fromMicrometres(420)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(1250.0),
            Dimension.fromMillimetres(1600.0)
        ),
        IT6: null,
        IT7: ToleranceWidth.fromMicrometres(125),
        IT8: ToleranceWidth.fromMicrometres(195),
        IT9: ToleranceWidth.fromMicrometres(310),
        IT10: ToleranceWidth.fromMicrometres(500)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(1600.0),
            Dimension.fromMillimetres(2000.0)
        ),
        IT6: null,
        IT7: ToleranceWidth.fromMicrometres(150),
        IT8: ToleranceWidth.fromMicrometres(230),
        IT9: ToleranceWidth.fromMicrometres(370),
        IT10: ToleranceWidth.fromMicrometres(600)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(2000.0),
            Dimension.fromMillimetres(2500.0)
        ),
        IT6: null,
        IT7: ToleranceWidth.fromMicrometres(175),
        IT8: ToleranceWidth.fromMicrometres(280),
        IT9: ToleranceWidth.fromMicrometres(440),
        IT10: ToleranceWidth.fromMicrometres(700)
    },
    {
        nominalSizeRange: DimensionRange.fromOverAndUpTo(
            Dimension.fromMillimetres(2500.0),
            Dimension.fromMillimetres(3150.0)
        ),
        IT6: null,
        IT7: ToleranceWidth.fromMicrometres(210),
        IT8: ToleranceWidth.fromMicrometres(330),
        IT9: ToleranceWidth.fromMicrometres(540),
        IT10: ToleranceWidth.fromMicrometres(860)
    }
];
