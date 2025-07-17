import {ChainedToleranceStandardIdentifier} from "../src/ChainedToleranceStandardIdentifier";
import {DimensionWithTolerance} from "../src/DimensionWithTolerance";
import {ToleranceStandardIdentifier} from "../src/ToleranceStandardIdentifier";
import {ToleranceStandard} from "../src/ToleranceStandard";

describe("ChainedToleranceStandardIdentifier", () => {

    test('Should not identify tolerance standard when no identifiers are provided', () => {
        const identifier: ToleranceStandardIdentifier = ChainedToleranceStandardIdentifier.fromIdentifiers();
        const result: ToleranceStandard | null = identifier.identifyToleranceStandard({} as DimensionWithTolerance);
        expect(result).toBeNull();
    });

    test('Should not identify tolerance standard when empty array is provided', () => {
        const identifier: ToleranceStandardIdentifier = ChainedToleranceStandardIdentifier.fromIdentifiers([]);
        const result: ToleranceStandard | null = identifier.identifyToleranceStandard({} as DimensionWithTolerance);
        expect(result).toBeNull();
    });

    describe('When providing a single identifier', () => {

        test('Should not identify tolerance standard when identifier returns null', () => {
            const mockIdentifier: ToleranceStandardIdentifier = {
                identifyToleranceStandard: jest.fn().mockReturnValue(null)
            };
            const identifier: ToleranceStandardIdentifier = ChainedToleranceStandardIdentifier.fromIdentifiers([mockIdentifier]);
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard({} as DimensionWithTolerance);
            expect(result).toBeNull();
        });

        test('Should identify tolerance standard when identifier returns tolerance standard', () => {
            const mockIdentifier: ToleranceStandardIdentifier = {
                identifyToleranceStandard: jest.fn().mockReturnValue({name: 'ISO 2768'})
            };
            const identifier: ToleranceStandardIdentifier = ChainedToleranceStandardIdentifier.fromIdentifiers([mockIdentifier]);
            const result: ToleranceStandard | null = identifier.identifyToleranceStandard({} as DimensionWithTolerance);
            expect(result).toStrictEqual({name: 'ISO 2768'});
        });
    });

    describe('When chaining multiple identifiers', () => {

        describe('And all return null', () => {

            const mockIdentifierNull: ToleranceStandardIdentifier = {
                identifyToleranceStandard: jest.fn().mockReturnValue(null)
            };
            const identifier: ToleranceStandardIdentifier = ChainedToleranceStandardIdentifier.fromIdentifiers([
                mockIdentifierNull, mockIdentifierNull, mockIdentifierNull
            ]);

            beforeEach(() => {
               jest.clearAllMocks();
            });

            test('Should not identify tolerance standard', () => {
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard({} as DimensionWithTolerance);
                expect(result).toBeNull();
            });

            test('Should call each identifier in the chain', () => {
                identifier.identifyToleranceStandard({} as DimensionWithTolerance);
                expect(mockIdentifierNull.identifyToleranceStandard).toHaveBeenCalledTimes(3);
            });
        });

        describe('And one returns null, others return tolerance standards', () => {

            const mockIdentifierNull: ToleranceStandardIdentifier = {
                identifyToleranceStandard: jest.fn().mockReturnValue(null)
            };
            const mockIdentifierIso2768: ToleranceStandardIdentifier = {
                identifyToleranceStandard: jest.fn().mockReturnValue({name: 'ISO 2768'})
            };
            const mockIdentifierIso286: ToleranceStandardIdentifier = {
                identifyToleranceStandard: jest.fn().mockReturnValue({name: 'ISO 286'})
            };
            const identifier: ToleranceStandardIdentifier = ChainedToleranceStandardIdentifier.fromIdentifiers([
                mockIdentifierNull, mockIdentifierIso2768, mockIdentifierIso286
            ]);

            beforeEach(() => {
                jest.clearAllMocks();
            });

            test('Should return first non-null tolerance standard', () => {
                const result: ToleranceStandard | null = identifier.identifyToleranceStandard({} as DimensionWithTolerance);
                expect(result).toStrictEqual({name: 'ISO 2768'});
            });

            test('Should call prior identifiers before identifying tolerance standard', () => {
                identifier.identifyToleranceStandard({} as DimensionWithTolerance);
                expect(mockIdentifierNull.identifyToleranceStandard).toHaveBeenCalled();
            });

            test('Should call identifier that first identifies tolerance standard', () => {
                identifier.identifyToleranceStandard({} as DimensionWithTolerance);
                expect(mockIdentifierIso2768.identifyToleranceStandard).toHaveBeenCalled();
            });

            test('Should not call subsequent identifiers after identifying tolerance standard', () => {
                identifier.identifyToleranceStandard({} as DimensionWithTolerance);
                expect(mockIdentifierIso286.identifyToleranceStandard).not.toHaveBeenCalled();
            });
        });
    });
});