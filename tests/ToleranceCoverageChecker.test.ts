import {SymmetricalTolerance} from "../src/SymmetricalTolerance";
import {ToleranceCoverageChecker} from "../src/ToleranceCoverageChecker";

describe('ToleranceCoverageChecker', () => {

    test('Should cover a symmetrical tolerance equal to itself', () => {
        const tolerance = SymmetricalTolerance.fromMillimetres(0.1);
        const result = ToleranceCoverageChecker.isToleranceCovered(tolerance, tolerance);
        expect(result).toBe(true);
    });

    test('Should cover a wider symmetrical tolerance', () => {
        const candidate = SymmetricalTolerance.fromMillimetres(0.2);
        const cover = SymmetricalTolerance.fromMillimetres(0.1);
        const result = ToleranceCoverageChecker.isToleranceCovered(candidate, cover);
        expect(result).toBe(true);
    });

    test('Should not cover a narrower symmetrical tolerance', () => {
        const candidate = SymmetricalTolerance.fromMillimetres(0.1);
        const cover = SymmetricalTolerance.fromMillimetres(0.2);
        const result = ToleranceCoverageChecker.isToleranceCovered(candidate, cover);
        expect(result).toBe(false);
    });
});