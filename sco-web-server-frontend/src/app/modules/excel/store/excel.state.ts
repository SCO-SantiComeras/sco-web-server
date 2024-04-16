import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap } from "rxjs/operators";
import { ExcelService } from "../excel.service";
import { CreateExcelFile } from "./excel.actions";
import { Injectable } from "@angular/core";
import { ScoTranslateService } from "sco-angular-components";
import { HttpErrorsService } from "../../shared/http-error/http-errors.service";

export class ExcelStateModel {
    generatedFile: any;
    success: boolean;
    successMsg: string;
    errorMsg: string;
}

export const ExcelStateDefaults: ExcelStateModel = {
    generatedFile: undefined,
    success: false,
    successMsg: '',
    errorMsg: '',
};

@State<ExcelStateModel>({
    name: 'excel',
    defaults: ExcelStateDefaults,
})

@Injectable()
export class ExcelState {

    constructor(
        private readonly excelService: ExcelService,
        private readonly translateService: ScoTranslateService,
        private readonly httpErrorsService: HttpErrorsService,
    ) {}

    @Selector()
    static generatedFile(state: ExcelStateModel): any {
        return state.generatedFile;
    }

    @Selector()
    static success(state: ExcelStateModel): boolean {
        return state.success;
    }

    @Selector()
    static successMsg(state: ExcelStateModel): string {
        return state.successMsg;
    }

    @Selector()
    static errorMsg(state: ExcelStateModel): string {
        return state.errorMsg;
    }

    @Action(CreateExcelFile)
    public createExcelFile(
        { patchState }: StateContext<ExcelStateModel>,
        { payload }: CreateExcelFile
    ) {
        return this.excelService.createFile(payload.excel).pipe(
            tap((createdFile: any) => {
                if (createdFile) {
                    patchState({
                        success: true,
                        successMsg: this.translateService.getTranslate('label.excel.state.createExcelFile.success'),
                        generatedFile: createdFile,
                    });
                } else {
                    patchState({
                        success: false, 
                        errorMsg: this.translateService.getTranslate('label.excel.state.createExcelFile.error'),
                        generatedFile: undefined,
                    });
                }
            }),
            catchError(error => {
                let errorMsg: string = this.translateService.getTranslate('label.excel.state.createExcelFile.error');
                if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                    errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
                }
  
                patchState({
                    success: false,
                    errorMsg: errorMsg,
                    generatedFile: undefined,
                });
                throw new Error(error);
            }),
        );
    }
}  