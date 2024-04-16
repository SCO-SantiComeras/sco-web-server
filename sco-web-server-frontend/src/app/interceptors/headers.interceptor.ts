import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from '../modules/auth/store/auth.state';
import { Token } from '../modules/auth/model/token';
import { ScoConstantsService, ScoTranslateService } from 'sco-angular-components';

@Injectable({ providedIn: 'root' })
export class HeadersInterceptor implements HttpInterceptor {

  @Select(AuthState.token) token$: Observable<Token>;
  token: Token;

  constructor(
    private readonly translateService: ScoTranslateService,
    private readonly constantsService: ScoConstantsService,
  ) {
    this.token$.subscribe((token: Token) => {
      this.token = token;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const setHeaders: any = {
        ClientLanguage: 
          this.translateService.getLanguage() || this.constantsService.ScoTranslateConstants.DEFAULT_LANGUAGE,
      }

      if (this.token) {
        setHeaders.Authorization = `Bearer ${this.token.accessToken}`;
      }

      request = request.clone({
        setHeaders: setHeaders,
      });
    } catch (err) {
      console.error(err);
    } finally {
      return next.handle(request);
    }
  }
}
