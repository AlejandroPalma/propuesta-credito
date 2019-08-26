import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    if(localStorage.getItem('userToken'))
    {
      const clonedreq = req.clone({ headers: req.headers.set('Authorization','Bearer ' + localStorage.getItem('userToken')) });
      return next.handle(clonedreq);
    }
    else {
      return next.handle(req);
    }
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   const idToken = localStorage.getItem('userToken');

  //   if (idToken) {
  //     const cloned = req.clone({
  //       headers: req.headers.set("Authorization", "Bearer " + idToken)
  //     });
  //     return next.handle(cloned);
  //   }
  //   else {
  //     return next.handle(req);
  //   }
  // }

}
