import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { PrivateContainerComponent } from '../private-container/private-container.component';
import { first } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '@/_dialogs/confirmation-dialog/confirmation-dialog.component';
import { StoreService } from '@/_services/store.service';

@Component({
  selector: 'app-private-products',
  templateUrl: './private-products.component.html',
  styleUrls: ['./private-products.component.scss']
})

export class PrivateProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantity', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private privateContainer: PrivateContainerComponent,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.storeService.getProducts(this.privateContainer.getStoreId()).pipe(first()).subscribe(products => {
      this.dataSource.data = products['hydra:member'];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(products);
    });
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

}
