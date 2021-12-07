import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariationRoutingModule } from './variation-routing.module';
import { VariationAddComponent } from './variation-add/variation-add.component';
import { VariationListComponent } from './variation-list/variation-list.component';
import { VariationEditComponent } from './variation-edit/variation-edit.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [VariationAddComponent, VariationListComponent, VariationEditComponent],
  imports: [
    CommonModule,
    VariationRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [VariationAddComponent, VariationEditComponent]
})
export class VariationModule { }
