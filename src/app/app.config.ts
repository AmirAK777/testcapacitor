import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './Register/shared/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimations(),
    provideAngularSvgIcon(),
    provideToastr(),
  ]
};
