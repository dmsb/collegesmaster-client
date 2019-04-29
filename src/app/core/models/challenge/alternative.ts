import { Question } from "./question";
import { Model } from "../generic/model";
import { Letter } from "../../enums/letter";

export class Alternative extends Model {
    letter: Letter;
    description: string;
    isTrue: boolean;
    question: Question;
}