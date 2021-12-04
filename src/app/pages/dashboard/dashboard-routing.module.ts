import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';
import { AdminGuard } from '../../guards/admin/admin.guard';
import { CustomerGuard } from '../../guards/customer/customer.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        component: DashboardAdminComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'customer',
        component: DashboardCustomerComponent,
        canActivate: [CustomerGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
