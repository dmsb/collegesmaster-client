import { Model } from "../generic/model";
import { Privilege } from "./privilege";

export class Role extends Model {
    name: string;
    privileges: Privilege[];
}