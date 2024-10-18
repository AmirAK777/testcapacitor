import { Answer } from "./answer";

export class Question {
    id!: string;
    header!: string;
    name!: string;
    subText!: string;
    questionOrder!: number;
    referenceQuestionName!: string;
    answers: Array<Answer> | undefined;
}
