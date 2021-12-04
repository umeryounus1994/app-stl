import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent, CategoryAddComponent, CategoryEditComponent],
  imports: [
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule, 
    NgxSpinnerModule
  ],
  entryComponents: [CategoryAddComponent, CategoryEditComponent]
})
export class CategoryModule { }
