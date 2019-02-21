import { PageableInfo } from "./pageable-info";
import { Sort } from "./sort";
import { Model } from "../model";

export class  Pageable <T extends Model> {
    content: Array<T>;
    first: boolean;
    last: boolean;
    number: Number;
    numberOfElements: Number;
    pageable: PageableInfo;
    size: Number;
    sort: Sort;
    totalElements: Number;
    totalPages: Number;
}