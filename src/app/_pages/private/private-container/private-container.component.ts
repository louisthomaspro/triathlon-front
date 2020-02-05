import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services/authentication.service';
import { Router } from '@angular/router';
import { User } from '@/_models/user';

@Component({
  selector: 'app-private-container',
  templateUrl: './private-container.component.html',
  styleUrls: ['./private-container.component.scss']
})
export class PrivateContainerComponent implements OnInit {

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  ngOnInit() {
  }

}
