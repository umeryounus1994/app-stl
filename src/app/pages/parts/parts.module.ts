import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartsRoutingModule } from './parts-routing.module';
import { ListPartsComponent } from './list-parts/list-parts.component';
import { AddPartsComponent } from './add-parts/add-parts.component';
import { EditPartsComponent } from './edit-parts/edit-parts.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [ListPartsComponent, AddPartsComponent, EditPartsComponent],
  imports: [
    CommonModule,
    PartsRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [AddPartsComponent, EditPartsComponent]
})
export class PartsModule { }
