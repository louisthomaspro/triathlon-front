import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { first } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '@/_dialogs/confirmation-dialog/confirmation-dialog.component';
import { AdminService } from '@/_services/admin.service';

@Component({
  selector: 'app-private-stores',
  templateUrl: './private-stores.component.html',
  styleUrls: ['./private-stores.component.scss']
})

export class PrivateStoresComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.adminService.getStores().pipe(first()).subscribe(stores => {
      this.displayedColumns = ['name', 'numberOfUsers', 'numberOfProducts', 'action'];
      this.dataSource.data = stores['hydra:member'];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(stores);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStore(row: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Store product",
        text: 'Are you sure you want to delete the store "' + row.name + '" ? This will destroy all the users and products linked to it.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteStore(row.id).pipe(first()).subscribe(
          data => {
            this.deleteRowData(row);
            this.snackBar.open('Store deleted !! :)', '', {
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


  displayUsersEmails(userItems) {
    let array = [];
    userItems.forEach(element => {
      array.push(element.email);
    });

    return array.join(', ')
  }

  displayProductNames(productItems) {
    let array = [];
    productItems.forEach(element => {
      array.push(element.name + "(" + element.quantity + ")");
    });

    return array.join(', ')
  }

}
