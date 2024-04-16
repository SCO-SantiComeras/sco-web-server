import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { LogOut } from '../../store/auth.actions';
import { AuthState } from '../../store/auth.state';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly toastService: ScoToastService,
    private readonly translateService: ScoTranslateService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LogOut()).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(AuthState.success);
        if (success) {
          this.toastService.addSuccessMessage(
            this.translateService.getTranslate('label.success'), 
            this.store.selectSnapshot(AuthState.successMsg),
          );

          this.router.navigate(['/login']);
        }
      }
    });
  }
}
