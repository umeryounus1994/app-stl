import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { ItemRoutingModule } from './item-routing.module';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemEditComponent } from './item-edit/item-edit.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemListComponent, ItemAddComponent, ItemEditComponent],
  imports: [
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ItemRoutingModule, 
    NgxSpinnerModule
  ],
  entryComponents: [ItemAddComponent, ItemEditComponent]
})
export class ItemModule { }
