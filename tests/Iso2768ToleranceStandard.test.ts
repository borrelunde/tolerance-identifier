import {Iso2768ToleranceClass, Iso2768ToleranceStandard} from "../src/Iso2768ToleranceStandard";

describe('ISO 2768 Tolerance Standard', () => {

    describe('When constructing with factory method', () => {

        const toleranceClasses: Iso2768ToleranceClass[] = ['f', 'm', 'c', 'v'];

        toleranceClasses.forEach(toleranceClass => {
            test(`Tolerance class getter should return tolerance class '${toleranceClass}'`, () => {
                const toleranceStandard: Iso2768ToleranceStandard = Iso2768ToleranceStandard.fromToleranceClass(toleranceClass);
                expect(toleranceStandard.getToleranceClass()).toBe(toleranceClass);
            });
        });
    });
});