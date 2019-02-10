import { Model } from "../generic/model";
import { Course } from "./course";

export class Institute extends Model {
    name: string;
    courses: Course[];
}