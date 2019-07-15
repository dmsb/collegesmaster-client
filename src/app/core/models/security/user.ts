import { Model } from "../generic/model";
import { Role } from "./role";

export class User extends Model {
    username: string;
    password: string;
    email: string;
    cpf: string;
    firstName: string;
    lastName: String;
    birthdate: Date;
    roles: Role[];
}