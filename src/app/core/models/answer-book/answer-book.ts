import { Model } from "../generic/model";
import { Challenge } from "../challenge/challenge";
import { Student } from "../security/student";
import { QuestionOfAnswerBook } from "./question-of-answered-book";

export class AnswerBook extends Model {
    challenge: Challenge;
    owner: Student;
    score: Number;
    questionsOfAswerBook: QuestionOfAnswerBook[];
}