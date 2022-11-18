import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthJwtService } from './authJwt.service';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {
  constructor(private authJwtService: AuthJwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authJwtService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return next.handle(req);
  }
}
