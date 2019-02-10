import { Model } from "../generic/model";
import { Role } from "./role";
import { Course } from "../institutes/course";

export class User extends Model {
    username: string;
    password: string;
    email: string;
    fullName: string;
    birthdate: Date;
    course: Course;
    roles: Role[];
}