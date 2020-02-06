import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { PrivateContainerComponent } from '../private-container/private-container.component';
import { first } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '@/_dialogs/confirmation-dialog/confirmation-dialog.component';
import { StoreService } from '@/_services/store.service';
import { AuthenticationService } from '@/_services/authentication.service';
import { AdminService } from '@/_services/admin.service';

@Component({
  selector: 'app-private-products',
  templateUrl: './private-products.component.html',
  styleUrls: ['./private-products.component.scss']
})

export class PrivateProductsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

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
    if (this.authentificationService.currentUserValue.data.roles.includes('ADMIN')) {
      this.adminService.getProducts().pipe(first()).subscribe(products => {
        this.displayedColumns = ['name', 'quantity', 'store', 'action'];
        this.dataSource.data = products['hydra:member'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(products);
      });
    } else {
      this.storeService.getProducts(this.privateContainer.getStoreId()).pipe(first()).subscribe(products => {
        this.displayedColumns = ['name', 'quantity', 'action'];
        this.dataSource.data = products['hydra:member'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(products);
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(row: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Delete product",
        text: 'Are you sure you want to delete the product "' + row.name + '" ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.storeService.deleteProduct(row.id).pipe(first()).subscribe(
          data => {
            this.deleteRowData(row);
            this.snackBar.open('Product deleted !! :)', '', {
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


  incProduct(row: any) {
    this.storeService.editProduct({ id: row.id, quantity: row.quantity + 1 }).pipe(first()).subscribe(
      data => {
        const index = this.dataSource.data.indexOf(row);
        this.dataSource.data[index].quantity += 1;
        this.dataSource._updateChangeSubscription();
        this.snackBar.open('Product incremented !! :)', '', {
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

  decProduct(row: any) {
    if (row.quantity <= 0) {
      this.snackBar.open('You can\'t decrement more !! :)', '', {
        duration: 3000
      });
      return;
    }
    this.storeService.editProduct({ id: row.id, quantity: row.quantity - 1 }).pipe(first()).subscribe(
      data => {
        const index = this.dataSource.data.indexOf(row);
        this.dataSource.data[index].quantity -= 1;
        this.dataSource._updateChangeSubscription();
        this.snackBar.open('Product decremented !! :)', '', {
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

}
