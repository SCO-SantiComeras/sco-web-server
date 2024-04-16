import { cloneDeep } from 'lodash-es';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public downloadExcelFile(res: any, filename: string): boolean {
    if (!res || !filename) {
      return false;
    }

    let result: boolean = true;
    try {
      const buf = new Uint8Array(res.data).buffer;
      const buftype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8';
      const blob = new Blob([buf], { type: buftype });

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${filename}`
      a.click();
    } catch (error) {
      error = false;
    } finally {
      return result;
    }
  }
  
  public getArrayFromPosition(array: any[], position: number = 1): any[] {
    if (!array || array && array.length == 0) {
      return [];
    }

    return cloneDeep(array.slice(position));
  }
}
