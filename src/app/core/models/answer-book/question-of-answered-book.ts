import { Model } from "../generic/model";
import { AnswerBook } from "./answer-book";
import { Question } from "../challenge/question";
import { Alternative } from "../challenge/alternative";

export class QuestionOfAnswerBook extends Model {
    description: string;
    score: Number;
    answerBook: AnswerBook;
    targetQuestion: Question;
    selectedAlternatives: Alternative[];
}