// from angular core
import {ApplicationConfig} from '@angular/core';
// from angular router
import {provideRouter} from '@angular/router';

// from routes file
import {routes} from './app.routes';
// from angular angular platform browser
import {provideNoopAnimations} from "@angular/platform-browser/animations";

// app configs
export const appConfig: ApplicationConfig = {
  // app providers
  providers: [
    provideRouter(routes),
    provideNoopAnimations()
  ]
};
