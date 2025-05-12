import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, delay, finalize, map, throwError } from 'rxjs';

export function servicesInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  
  const token = localStorage.getItem('Authorization');

  //console.log('interceptor!!!', token);

  const headers: any = {};
  if (token) {
    headers['Authorization'] = token;
  }

  const authRequest = req.clone({
    setHeaders: headers
  });

  return next(authRequest).pipe(
    delay(0),
    map((event: HttpEvent<any>) => event),
    catchError((error: any) => {
      let tipoError: number = error.status;
      let errorMsg: string = '';

      switch (tipoError) {
        case 401:
          errorMsg = 'Sesión terminada, favor de iniciar sesión.';
          break;
        case 400:
          errorMsg = error.error;
          break;
        default:
          errorMsg = 'Ocurrió un error inesperado.';
          break;
      }

      console.error(errorMsg);
      return throwError(() => error);
    }),
    finalize(() => {
      // Finalización si deseas algo aquí
    })
  );
}
