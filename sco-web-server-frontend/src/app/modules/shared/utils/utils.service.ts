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

  public downloadFile(base64:any,fileName:any){
    const src = `data:text/csv;base64,${base64}`;
    const a = document.createElement('a');
    a.href = src
    a.download = fileName
    a.click();
  }
  
  public getArrayFromPosition(array: any[], position: number = 1): any[] {
    if (!array || array && array.length == 0) {
      return [];
    }

    return cloneDeep(array.slice(position));
  }

  public isSubfolder(originPath: string, destinyPath: string) {
    const originSegments = originPath.split('/');
    const destinySegments = destinyPath.split('/');
  
    // Verifica si los segmentos de la ruta de origen son un subconjunto de los segmentos de la ruta de destino
    for (let i = 0; i < originSegments.length; i++) {
      if (originSegments[i] !== destinySegments[i]) {
        return false;
      }
    }
    
    // Verifica si la longitud de los segmentos de la ruta de origen es menor que la de los segmentos de la ruta de destino
    return originSegments.length < destinySegments.length;
  }
}
