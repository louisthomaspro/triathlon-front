import { Component } from '@angular/core';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    currentUser: User;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
    }

    ngOnInit() {
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}