import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@/_services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api  
            if (err.status === 401 && err.error.message != "Invalid credentials." || ([403].indexOf(err.status) !== -1)) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }


            console.error(err.error);
            return throwError(err.error);
        }))
    }
}