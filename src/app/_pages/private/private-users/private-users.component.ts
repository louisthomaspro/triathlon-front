import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { PrivateContainerComponent } from '../private-container/private-container.component';
import { first } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '@/_dialogs/confirmation-dialog/confirmation-dialog.component';
import { StoreService } from '@/_services/store.service';
import { AdminService } from '@/_services/admin.service';
import { AuthenticationService } from '@/_services/authentication.service';

@Component({
  selector: 'app-private-users',
  templateUrl: './private-users.component.html',
  styleUrls: ['./private-users.component.scss']
})

export class PrivateUsersComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  currentEmail: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private adminService: AdminService,
    private privateContainer: PrivateContainerComponent,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authentificationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.currentEmail = this.authentificationService.currentUserValue.data.email;
    if (this.authentificationService.currentUserValue.data.roles.includes('ROLE_ADMIN')) {
      this.adminService.getUsers().pipe(first()).subscribe(users => {
        this.displayedColumns = ['email', 'roles', 'store', 'action'];
        this.dataSource.data = users['hydra:member'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(users);
      });
    } else {
      this.storeService.getUsers(this.privateContainer.getStoreId()).pipe(first()).subscribe(users => {
        this.displayedColumns = ['email', 'roles', 'action'];
        this.dataSource.data = users['hydra:member'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(users);
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(row: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Delete user",
        text: 'Are you sure you want to delete the user "' + row.email + '" ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.storeService.deleteUser(row.id).pipe(first()).subscribe(
          data => {
            this.deleteRowData(row);
            this.snackBar.open('User deleted !! :)', '', {
              duration: 3000
            });
          },
          error => {
            console.log(error);
            this.snackBar.open('Error', '', {
              duration: 3000
            });
          });
      }
    });
  }


  deleteRowData(row: any) {
    const index = this.dataSource.data.indexOf(row);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

}
