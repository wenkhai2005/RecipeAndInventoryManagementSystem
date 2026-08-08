// src/app/app.config.ts
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker'; // or your routes inline

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })   // ✅ critical
  ]
};
