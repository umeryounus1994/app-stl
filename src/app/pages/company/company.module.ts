import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ListCompanyComponent } from './list-company/list-company.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [AddCompanyComponent, EditCompanyComponent, ListCompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [AddCompanyComponent, EditCompanyComponent]
})
export class CompanyModule { }
