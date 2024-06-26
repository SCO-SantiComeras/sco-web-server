import { ngxsConfig } from './../environments/constants';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { WebsocketsService } from './websockets/websockets.service';
import { ScoAngularComponentsModule, ScoConfigService, ScoTranslateService } from 'sco-angular-components';
import { AuthModule } from './modules/auth/auth.module';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { AuthGuard } from './guards/auth.guard.service';
import { AdminGuard } from './guards/admin.guard.service';
import { AppState } from './store/app.state';
import { ExcelModule } from './modules/excel/excel.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { NodeServerModule } from './modules/node-server/node-server.module';
import { SuperAdminGuard } from './guards/superadmin.guard.service';

export function configFactory(provider: ScoConfigService) {
  return () => provider.getDataFromJson('assets/config/data.json');
}

export function translateFactory(provider: ScoTranslateService) {
  return () => provider.getData('assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState], ngxsConfig),
    NgxsStoragePluginModule.forRoot({
      key: ["auth", "app"],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ScoAngularComponentsModule,

    AuthModule,
    ExcelModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
    
    NodeServerModule,
  ],
  providers: [
    WebsocketsService,
    AuthGuard,
    AdminGuard,
    SuperAdminGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [ScoTranslateService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ScoConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }