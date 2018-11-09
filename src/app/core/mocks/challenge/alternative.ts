import { Question } from "./question";

export interface Alternative extends Model {
    letter: string;
    description: string;
    isTrue: boolean;
    question: Question;
}