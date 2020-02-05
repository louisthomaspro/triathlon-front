import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@/_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // check if route is restricted by role
            console.log(route["_routerState"].url + " : " + route.data.role);
            if (route.data.role && currentUser.data.roles.indexOf(route.data.role) === -1) {
                // role not authorised so redirect to home page
                console.log('Page restricted.. redirect to /');
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        console.log('Not logged in.. redirect to /login');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}