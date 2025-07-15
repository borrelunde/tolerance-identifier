import {Iso286ToleranceGrade, Iso286ToleranceStandard} from "../src/Iso286ToleranceStandard";

describe('ISO 286  Tolerance Standard', () => {

    describe('When constructing with factory method', () => {

        const toleranceGrades: Iso286ToleranceGrade[] = ['IT6', 'IT7', 'IT8', 'IT9', 'IT10'];

        toleranceGrades.forEach(toleranceGrade => {
            test(`Tolerance grade getter should return tolerance grade '${toleranceGrade}'`, () => {
                const toleranceStandard: Iso286ToleranceStandard = Iso286ToleranceStandard.fromToleranceGrade(toleranceGrade);
                expect(toleranceStandard.getToleranceGrade()).toBe(toleranceGrade);
            });
        });
    })
});