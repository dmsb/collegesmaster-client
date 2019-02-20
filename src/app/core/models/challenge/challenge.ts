import { Question } from "./question";
import { Model } from "../generic/model";
import { Discipline } from "../institutes/discipline";
import { User } from "../security/user";
import { ChallengeType } from "../../enums/challenge-type";

export class Challenge extends Model {
    title: string;
    user: User;
    discipline: Discipline;
    questions: Question[];
    enabled: boolean;
    challengeType: ChallengeType;
}