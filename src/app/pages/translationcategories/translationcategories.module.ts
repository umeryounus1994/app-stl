import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationcategoriesRoutingModule } from './translationcategories-routing.module';
import { AddTcategoryComponent } from './add-tcategory/add-tcategory.component';
import { ListTcategoryComponent } from './list-tcategory/list-tcategory.component';
import { UpdateTcategoryComponent } from './update-tcategory/update-tcategory.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [AddTcategoryComponent, ListTcategoryComponent, UpdateTcategoryComponent],
  imports: [
    CommonModule,
    TranslationcategoriesRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [AddTcategoryComponent, UpdateTcategoryComponent]
})
export class TranslationcategoriesModule { }
