import { Alternative } from "./alternative";
import { Challenge } from "./challenge";

export interface Question extends Model {
    description: string;
    punctuation: Number;
    alternatives: Alternative[];
    challenge: Challenge;
}