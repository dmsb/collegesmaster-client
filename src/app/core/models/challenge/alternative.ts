import { Question } from "./question";
import { Model } from "../generic/model";

export class Alternative extends Model {
    letter: string;
    description: string;
    isTrue: boolean;
    question: Question;
}