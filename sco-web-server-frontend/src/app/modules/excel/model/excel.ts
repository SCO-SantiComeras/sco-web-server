import { WorkBook, utils } from 'xlsx';

export enum ExcelExtensionEnum {
  XLS = 'xls',
  XLSX = 'xlsx',
  CSV = 'csv',
  XLSXB = 'xlsb',
}

export class Excel {
  columns: string[];
  data: string[][];
  workbook?: WorkBook;
  fileName: string;
  extension: ExcelExtensionEnum;

  constructor(columns: string[], data: string[][], fileName: string, extension: ExcelExtensionEnum) {
    this.columns = columns;
    this.data = data;
    this.workbook = utils.book_new();
    this.fileName = fileName;
    this.extension = extension;
  }
}
