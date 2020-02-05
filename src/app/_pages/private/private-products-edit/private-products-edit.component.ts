import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PrivateContainerComponent } from '../private-container/private-container.component';
import { StoreService } from '@/_services/store.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-private-products-edit',
  templateUrl: './private-products-edit.component.html',
  styleUrls: ['./private-products-edit.component.scss']
})
export class PrivateProductsEditComponent implements OnInit {

  productForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private privateContainerComponent: PrivateContainerComponent,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      quantity: [0, [Validators.required]]
    });
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


    let product = {
      "name": this.f.name.value,
      "quantity": this.f.quantity.value,
      "store": "/api/v1/stores/" + this.privateContainerComponent.getStoreId()
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

