import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminService } from '@/_services/admin.service';

@Component({
  selector: 'app-private-stores-edit',
  templateUrl: './private-stores-edit.component.html',
  styleUrls: ['./private-stores-edit.component.scss']
})
export class PrivateStoresEditComponent implements OnInit {

  storeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.storeForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });    
    
  }

  get f() { return this.storeForm.controls; }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.storeForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push({ name: name, error: controls[name].errors });
      }
    }
    return invalid;
  }


  onSubmit() {

    if (this.storeForm.invalid) {
      console.log(this.findInvalidControls());
      this.snackBar.open('Invalid form !', '', {
        duration: 3000
      });
      return;
    }

    let store = {
      "name": this.f.name.value
    }

    this.adminService.addStore(store).pipe(first()).subscribe(
      data => {
        this.snackBar.open('Store added !! :)', '', {
          duration: 3000
        });
        this.router.navigate(['/stores']);
      },
      error => {
        console.log(error);
        this.snackBar.open('Error', '', {
          duration: 3000
        });
      });


  }
}

