import { Question } from "./question";

export class Alternative extends Model {
    letter: string;
    description: string;
    isTrue: boolean;
    question: Question;
}