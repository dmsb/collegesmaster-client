import { Model } from "../generic/model";
import { Course } from "./course";
import { Student } from "../security/student";
import { Professor } from "../security/professor";

export class Discipline extends Model {
    name: string;
    course: Course;
    students: Student[];
    professors: Professor[];
}