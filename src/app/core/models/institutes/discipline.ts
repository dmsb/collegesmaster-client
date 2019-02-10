import { Model } from "../generic/model";
import { Course } from "./course";

export class Discipline extends Model {
    name: string;
    course: Course;
}