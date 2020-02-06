import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PrivateContainerComponent } from '../private-container/private-container.component';
import { StoreService } from '@/_services/store.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@/_services/authentication.service';
import { AdminService } from '@/_services/admin.service';

@Component({
  selector: 'app-private-users-edit',
  templateUrl: './private-users-edit.component.html',
  styleUrls: ['./private-users-edit.component.scss']
})
export class PrivateUsersEditComponent implements OnInit {

  userForm: FormGroup;
  isAdmin: boolean = false;
  stores = [];
  roles = [
    {
      name: "Admin",
      id: "ROLE_ADMIN"
    },
    {
      name: "Store manager",
      id: "ROLE_STORE_MANAGER"
    },
    {
      name: "Seller",
      id: "ROLE_SELLER"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private privateContainerComponent: PrivateContainerComponent,
    private storeService: StoreService,
    private router: Router,
    private authentificationService: AuthenticationService,
    private adminService: AdminService
  ) { }

  ngOnInit() {

    this.isAdmin = this.authentificationService.currentUserValue.data.roles.includes('ROLE_ADMIN');

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', this.isAdmin ? [Validators.required] : []],
      store: ['', []]
    });

    if (this.isAdmin) {
      this.adminService.getStores().pipe(first()).subscribe(stores => {
        this.stores = stores['hydra:member'];
      });
    }
  }

  get f() { return this.userForm.controls; }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push({ name: name, error: controls[name].errors });
      }
    }
    return invalid;
  }


  onSubmit() {

    if (this.userForm.invalid) {
      console.log(this.findInvalidControls());
      this.snackBar.open('Invalid form !', '', {
        duration: 3000
      });
      return;
    }


    let roleId = "SELLER";
    if (this.isAdmin) {
      roleId = this.f.role.value;
    } else {
      roleId = this.privateContainerComponent.getStoreId();
    }

    let storeId = null;
    if (this.isAdmin) {
      storeId = this.f.store.value;
    } else {
      storeId = this.privateContainerComponent.getStoreId();
    }

    let user = {
      "email": this.f.email.value,
      "password": this.f.password.value,
      "store": storeId,
      "role": roleId
    }

    this.storeService.addUser(user).pipe(first()).subscribe(
      data => {
        this.snackBar.open('User added !! :)', '', {
          duration: 3000
        });
        this.router.navigate(['/users']);
      },
      error => {
        console.log(error);
        this.snackBar.open('Error', '', {
          duration: 3000
        });
      });


  }
}

