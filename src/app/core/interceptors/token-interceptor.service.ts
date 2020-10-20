import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let token = localStorage.getItem('access_token');
    if(token != null){
      request = request.clone({
        setHeaders: {
            authorization: `Bearer ${token}`
        },
      })
    }
    return next.handle(request);
  }

  constructor() { }
}
