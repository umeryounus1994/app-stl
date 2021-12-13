import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { ListMenuComponent } from './list-menu/list-menu.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [AddMenuComponent, EditMenuComponent, ListMenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [AddMenuComponent, EditMenuComponent]
})
export class MenuModule { }
