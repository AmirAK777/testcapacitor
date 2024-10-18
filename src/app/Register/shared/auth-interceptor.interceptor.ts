import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterService } from './register-service.service';
import { inject } from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const registerService = inject(RegisterService);
  
  

  return next(req);
}