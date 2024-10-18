export class RegisteredUser {
    customerId: string | undefined;
    firstName!: string;
    lastName!: string;
    phoneNumber!: string;
    email!: string;
    age!: number;
    zipCode!: string;
    children: number | undefined;
    maritalSituation: string | undefined;
    salaryIncome: number | undefined;
    passiveIncome: number | undefined;
    charges: number | undefined;
    monthlySaving: number | undefined;
    saving: number | undefined;
    rent: number | undefined;
    salaryAtRetirement: number | undefined;
    taxPerYear: number | undefined;
    reduceTaxes: boolean | undefined;
    prepareRetirement: boolean | undefined;
    generatePassiveIncome: boolean | undefined;
    realEstate: boolean | undefined;
    optimizeDeclaration: boolean | undefined;
    targetReturn: number | undefined;
    campaignId: string | undefined;
    password!: string;
    indexLastQuestionAnswered: number | undefined;
}