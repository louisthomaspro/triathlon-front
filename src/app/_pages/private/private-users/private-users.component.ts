import { Component, OnInit } from '@angular/core';
import { UserService } from '@/_services/user.service';
import { first } from 'rxjs/operators';
import { User } from '@/_models/user';
import { ConfirmationDialogComponent } from '@/_dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-private-users',
  templateUrl: './private-users.component.html',
  styleUrls: ['./private-users.component.scss']
})
export class PrivateUsersComponent implements OnInit {

  loading = false;
  users: User[] = [];

    constructor(
      private userService: UserService,
      public dialog: MatDialog
      ) { }

    ngOnInit() {
        this.loading = true;
    }


    test() {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: "Suppression du panier",
          text: 'Êtes vous sûr de vouloir supprimer le panier'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
        }
      });
    }
}
