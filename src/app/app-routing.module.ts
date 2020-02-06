import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '@/_helpers/auth.guard';
import { LoginComponent } from '@/_pages/public/login/login.component';
import { PrivateContainerComponent } from './_pages/private/private-container/private-container.component';
import { PrivateUsersComponent } from './_pages/private/private-users/private-users.component';
import { PrivateProductsComponent } from './_pages/private/private-products/private-products.component';
import { PrivateProductsEditComponent } from './_pages/private/private-products-edit/private-products-edit.component';
import { PrivateUsersEditComponent } from './_pages/private/private-users-edit/private-users-edit.component';
import { PrivateStoresComponent } from './_pages/private/private-stores/private-stores.component';
import { PrivateStoresEditComponent } from './_pages/private/private-stores-edit/private-stores-edit.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: PrivateContainerComponent,
        children: [
            {
                path: 'products',
                component: PrivateProductsComponent,
                canActivate: [AuthGuard],
                data: { role: 'ROLE_SELLER' }
            },
            {
                path: 'products/new',
                component: PrivateProductsEditComponent,
                canActivate: [AuthGuard],
                data: { role: 'ROLE_STORE_MANAGER' }
            },
            {
                path: 'users',
                component: PrivateUsersComponent,
                canActivate: [AuthGuard],
                data: { role: 'ROLE_STORE_MANAGER' }
            },
            {
                path: 'users/new',
                component: PrivateUsersEditComponent,
                canActivate: [AuthGuard],
                data: { role: 'ROLE_STORE_MANAGER' }
            },
            {
                path: 'stores',
                component: PrivateStoresComponent,
                canActivate: [AuthGuard],
                data: { role: 'ROLE_ADMIN' }
            },
            {
                path: 'stores/new',
                component: PrivateStoresEditComponent,
                canActivate: [AuthGuard],
                data: { role: 'ROLE_ADMIN' }
            }
        ],
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }