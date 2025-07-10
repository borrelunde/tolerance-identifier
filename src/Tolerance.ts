/**
 * Represents a tolerance with upper and lower bounds. Implementations can
 * define different types of tolerances, such as symmetrical or deviation
 * tolerances.
 */
export interface Tolerance {
    getUpper(): number;
    getLower(): number;
}