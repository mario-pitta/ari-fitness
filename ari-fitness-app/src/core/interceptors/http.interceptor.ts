import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new Headers()
    headers.set("Accept", "*/*")
    console.log("interceptando requeest....", headers)

    console.log("request after intercept....", req)
    return next.handle(req);
  }
}
