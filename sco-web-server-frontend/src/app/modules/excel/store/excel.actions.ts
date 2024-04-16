import { Excel } from "../model/excel";

export class CreateExcelFile {
    static readonly type = '[EXCEL] Generate a new excel file';
    constructor(public payload: { excel: Excel } ) {}
}