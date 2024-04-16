import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap } from "rxjs/operators";
import { EmailerService } from "../emailer.service";
import { SendMail } from "./emailer.actions";
import { HttpErrorsService } from "../../shared/http-error/http-errors.service";
import { ScoTranslateService } from "sco-angular-components";
import { Injectable } from "@angular/core";

export class EmailerStateModel {
    success: boolean;
    successMsg: string;
    errorMsg: string;
}

export const EmailerStateDefaults: EmailerStateModel = {
    success: false,
    successMsg: '',
    errorMsg: '',
};

@State<EmailerStateModel>({
    name: 'emailer',
    defaults: EmailerStateDefaults,
})

@Injectable()
export class EmailerState {

    constructor(
        private emailerService: EmailerService,
        private readonly translateService: ScoTranslateService,
        private readonly httpErrorsService: HttpErrorsService,
    ) {}
  
    @Selector()
    static success(state: EmailerStateModel): boolean {
        return state.success;
    }

    @Selector()
    static successMsg(state: EmailerStateModel): string {
        return state.successMsg;
    }

    @Selector()
    static errorMsg(state: EmailerStateModel): string {
        return state.errorMsg;
    }

    @Action(SendMail)
    public sendMail(
        { patchState }: StateContext<EmailerStateModel>,
        { payload }: SendMail
    ) {
        return this.emailerService.sendMail(payload.message).pipe(
            tap((success: boolean) => {
                if (success) {
                    patchState({
                        success: true,
                        successMsg: this.translateService.getTranslate('label.emailer.state.sendMail.success'),
                    });
                } else {
                    patchState({
                        success: false,
                        errorMsg: this.translateService.getTranslate('label.emailer.state.sendMail.error'),
                    });
                }
            }),
            catchError(error => {
                let errorMsg: string = this.translateService.getTranslate('label.emailer.state.sendMail.error');
                if (this.httpErrorsService.getErrorMessage(error.error.message)) {
                    errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
                }
  
                patchState({
                    success: false,
                    errorMsg: errorMsg,
                });
                throw new Error(error);
            }),
        );
    }
}  