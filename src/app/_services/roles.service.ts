import { Injectable, OnInit } from '@angular/core';
import { scan } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface Role {
  name: string;
}

@Injectable()
export class RolesService {
  // A stream that exposes all the roles a user has
  roles$ = new ReplaySubject<string[]>(1);

  // We leverage this roleUpdates$ to be able to update the roles
  // This is for demonstration purposes only
  roleUpdates$ = new BehaviorSubject(['basic']);

  constructor() {
    this.roleUpdates$
      .pipe(
        scan((acc, next) => next, [])
      )
      .subscribe(this.roles$);
  }

  update(roles) {
    this.roleUpdates$.next(roles);
  }
}
