import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { SubCategoryRoutingModule } from './sub-category-routing.module';

import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryAddComponent } from './sub-category-add/sub-category-add.component';
import { SubCategoryEditComponent } from './sub-category-edit/sub-category-edit.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SubCategoryListComponent, SubCategoryAddComponent, SubCategoryEditComponent],
  imports: [
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SubCategoryRoutingModule, 
    NgxSpinnerModule
  ],
  entryComponents: [SubCategoryAddComponent, SubCategoryEditComponent]
})
export class SubCategoryModule { }
