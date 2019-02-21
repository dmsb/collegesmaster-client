import { Sort } from "./sort";

export class  PageableInfo {
    offset : Number;
    pageNumber : Number;
    pageSize : Number;
    paged : Boolean;
    sort : Sort;
    unpaged : Boolean;
}