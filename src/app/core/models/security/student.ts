import { User } from "./user";
import { StudentLevelDesignation } from "../../enums/StudentLevelDesignation";
import { Course } from "../institutes/course";

export class Student extends User {
    level: Number;
    levelDesignation: StudentLevelDesignation;
    course: Course;
}