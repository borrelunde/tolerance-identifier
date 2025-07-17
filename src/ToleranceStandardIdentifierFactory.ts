import {ChainedToleranceStandardIdentifier} from "./ChainedToleranceStandardIdentifier";
import {Iso2768ToleranceStandardIdentifier} from "./Iso2768ToleranceStandardIdentifier";
import {Iso286ToleranceStandardIdentifier} from "./Iso286ToleranceStandardIdentifier";

/**
 * Factory class for creating tolerance standard identifiers.
 */
export class ToleranceStandardIdentifierFactory {

    /**
     * Creates a chained tolerance standard identifier that combines ISO 2768
     * and ISO 286. This identifier can be used to identify tolerances based on
     * both standards where ISO 2768 takes precedence and ISO 286 acts as a
     * fallback.
     *
     * @returns The chained identifier for ISO 2768 and ISO 286.
     */
    static createChainedIso2768AndIso286Identifier(): ChainedToleranceStandardIdentifier {
        return ChainedToleranceStandardIdentifier.fromIdentifiers([
            new Iso2768ToleranceStandardIdentifier(),
            new Iso286ToleranceStandardIdentifier()
        ]);
    }
}