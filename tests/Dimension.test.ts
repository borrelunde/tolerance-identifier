import {Dimension} from "../src/Dimension";

describe('Dimension', () => {

    test('Should construct from and return zero millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(0.0);
        expect(dimension.getMillimetres()).toBe(0.0);
    });

    test('Should construct from and return positive millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(1.0);
        expect(dimension.getMillimetres()).toBe(1.0);
    });

    test('Should construct from and return positive decimal millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(1.5);
        expect(dimension.getMillimetres()).toBe(1.5);
    });

    test('Should construct from and return negative millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(-1.0);
        expect(dimension.getMillimetres()).toBe(-1.0);
    });

    test('Should construct from and return negative decimal millimetres', () => {
        const dimension: Dimension = Dimension.fromMillimetres(-1.5);
        expect(dimension.getMillimetres()).toBe(-1.5);
    });
});