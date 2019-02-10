import { Alternative } from "./alternative";
import { Challenge } from "./challenge";
import { Model } from "../generic/model";

export class Question extends Model {
    description: string;
    punctuation: Number;
    alternatives: Alternative[];
    challenge: Challenge;
}