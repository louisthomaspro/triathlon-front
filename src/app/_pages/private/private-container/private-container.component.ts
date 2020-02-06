import { Component, OnInit } from '@angular/core';
import { User } from '@/_models/user';
import { StoreService } from '@/_services/store.service';
import { AuthenticationService } from '@/_services/authentication.service';

@Component({
  selector: 'app-private-container',
  templateUrl: './private-container.component.html',
  styleUrls: ['./private-container.component.scss']
})
export class PrivateContainerComponent implements OnInit {

  currentUser: User;
  storeId: string;
  storeName: string;

  constructor(
    private authentificationService: AuthenticationService,
    private storeService: StoreService
  ) {
    this.authentificationService.currentUser.subscribe(x => { this.currentUser = x; });
  }

  ngOnInit() {
    this.storeId = this.authentificationService.currentUserValue.data.store;
    if (this.storeId == null) {
      this.storeName = 'ALL (you are admin)';
    } else {
      this.storeService.getStore(this.storeId).subscribe(x => { this.storeName = x.name; });
    }
  }

  getStoreId() {
    return this.storeId;
  }

  getStoreName() {
    return this.storeName;
  }

}
