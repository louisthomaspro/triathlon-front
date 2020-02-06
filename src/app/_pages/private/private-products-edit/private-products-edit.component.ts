import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PrivateContainerComponent } from '../private-container/private-container.component';
import { StoreService } from '@/_services/store.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminService } from '@/_services/admin.service';
import { AuthenticationService } from '@/_services/authentication.service';

@Component({
  selector: 'app-private-products-edit',
  templateUrl: './private-products-edit.component.html',
  styleUrls: ['./private-products-edit.component.scss']
})
export class PrivateProductsEditComponent implements OnInit {

  productForm: FormGroup;
  stores = [];
  isAdmin: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private privateContainerComponent: PrivateContainerComponent,
    private storeService: StoreService,
    private adminService: AdminService,
    private router: Router,
    private authentificationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
      store: ['', this.isAdmin ? [Validators.required] : []]
    });

    this.isAdmin = this.authentificationService.currentUserValue.data.roles.includes('ROLE_ADMIN');
    
    if (this.isAdmin) {
      this.adminService.getStores().pipe(first()).subscribe(stores => {
        this.stores = stores['hydra:member'];
      });
    }
    
    
  }

  get f() { return this.productForm.controls; }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.productForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push({ name: name, error: controls[name].errors });
      }
    }
    return invalid;
  }


  onSubmit() {

    if (this.productForm.invalid) {
      console.log(this.findInvalidControls());
      this.snackBar.open('Invalid form !', '', {
        duration: 3000
      });
      return;
    }


    let storeId = "0";
    if (this.isAdmin) {
      storeId = this.f.store.value;
    } else {
      storeId = this.privateContainerComponent.getStoreId();
    }

    let product = {
      "name": this.f.name.value,
      "quantity": this.f.quantity.value,
      "store": "/api/v1/stores/" + storeId
    }

    this.storeService.addProduct(product).pipe(first()).subscribe(
      data => {
        this.snackBar.open('Produit added !! :)', '', {
          duration: 3000
        });
        this.router.navigate(['/products']);
      },
      error => {
        console.log(error);
        this.snackBar.open('Error', '', {
          duration: 3000
        });
      });


  }
}

