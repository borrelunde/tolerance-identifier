/**
 * Dimension is a class representing a dimension in a technical drawing, in
 * millimetres.
 */
export class Dimension {

    /**
     * Private constructor to enforce the use of the factory method.
     *
     * @param mm the millimetres of the dimension.
     */
    private constructor(private readonly mm: number) {
        // The field is assigned via a parameter property.
    }

    /**
     * Static factory method for constructing a Dimension from millimetres.
     *
     * @param mm the millimetres of the dimension.
     */
    static fromMillimetres(mm: number): Dimension {
        return new Dimension(mm);
    }

    getMillimetres(): number {
        return this.mm;
    }
}