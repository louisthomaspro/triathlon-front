import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from '@/_helpers/';

import { AppRoutingModule } from '@/app-routing.module'
import { JwtInterceptor } from '@/_helpers/jwt.interceptor';
import { ErrorInterceptor } from '@/_helpers/error.interceptor';
import { AppComponent } from '@/app.component';
import { LoginComponent } from '@/_pages/public/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatIconModule, MatInputModule, MatTableModule, MatTabsModule, MatCardModule, MatDividerModule, MatSidenavModule, MatListModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';
import { AlertComponent } from './_components/alert/alert.component';
import { PrivateContainerComponent } from './_pages/private/private-container/private-container.component';
import { PrivateUsersComponent } from './_pages/private/private-users/private-users.component';
import { SharedModule } from './_dialogs/share.module';
import { PrivateProductsComponent } from './_pages/private/private-products/private-products.component';
import { PrivateProductsEditComponent } from './_pages/private/private-products-edit/private-products-edit.component';
import { PrivateUsersEditComponent } from './_pages/private/private-users-edit/private-users-edit.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { RolesService } from './_services/roles.service';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,
        MatCardModule,
        SharedModule,
        MatDividerModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatPaginatorModule,
        MatSnackBarModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        AlertComponent,
        PrivateContainerComponent,
        PrivateUsersComponent,
        PrivateProductsComponent,
        PrivateProductsEditComponent,
        PrivateUsersEditComponent,
        HasRoleDirective
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        Title,
        RolesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };