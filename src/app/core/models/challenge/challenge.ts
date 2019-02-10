import { Question } from "./question";

export class Challenge extends Model {
    title: string;
    user: User;
    discipline: Discipline;
    questions: Question[];
    enabled: boolean;
    challengeType: String;
}