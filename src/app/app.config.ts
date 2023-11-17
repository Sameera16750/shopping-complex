// from angular core
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
// from angular router
import {provideRouter} from '@angular/router';

// from routes file
import {routes} from './app.routes';
// from angular platform browser
import {provideNoopAnimations} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

// app configs
export const appConfig: ApplicationConfig = {
  // app providers
  providers: [
    provideRouter(routes),
    provideNoopAnimations(),
    importProvidersFrom(HttpClientModule)
  ]
};
