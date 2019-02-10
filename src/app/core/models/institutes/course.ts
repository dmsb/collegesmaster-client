import { Model } from "../generic/model";
import { Institute } from "./institute";
import { Discipline } from "./discipline";

export class Course extends Model {
    name: string;
    institute: Institute;
    disciplines: Discipline[];
}