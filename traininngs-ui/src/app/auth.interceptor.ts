import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly apiService: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.apiService.isLoading.next(true);
    if (localStorage.getItem('token')) {
      let authorization = {
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      request = request.clone(authorization);
    }
    return next.handle(request).pipe(catchError((err) => {
      this.apiService.isLoading.next(false);
      return err;
    }))
    .pipe(map<any, any>((evt: HttpEvent<any>) => {
      if (evt instanceof HttpResponse) {
        this.apiService.isLoading.next(false);
      }
      return evt;
    }));;
  }
}
