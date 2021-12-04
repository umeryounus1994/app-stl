import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

import { ChartistModule } from 'ng-chartist';
import { CountUpModule } from 'countup.js-angular2';
import { DashboardCustomerComponent } from './dashboard-customer/dashboard-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardAdminComponent, DashboardCustomerComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CountUpModule,
    ChartistModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
