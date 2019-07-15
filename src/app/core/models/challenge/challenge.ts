import { Question } from "./question";
import { Model } from "../generic/model";
import { Discipline } from "../institutes/discipline";
import { ChallengeType } from "../../enums/challenge-type";
import { ChallengeStatus } from "../../enums/challenge-status";
import { Professor } from "../security/professor";

export class Challenge extends Model {
    title: string;
    owner: Professor;
    discipline: Discipline;
    questions: Question[];
    enabled: boolean;
    challengeType: ChallengeType;
    challengeStatus: ChallengeStatus;

}