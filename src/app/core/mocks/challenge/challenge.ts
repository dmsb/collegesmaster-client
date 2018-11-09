import { Question } from "./question";

export interface Challenge extends Model {
    title: string;
    user: User;
    discipline: Discipline;
    questions: Question[];
}