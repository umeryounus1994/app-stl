import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageRoutingModule } from './language-routing.module';
import { AddLanguageComponent } from './add-language/add-language.component';
import { EditLanguageComponent } from './edit-language/edit-language.component';
import { ListLanguageComponent } from './list-language/list-language.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [AddLanguageComponent, EditLanguageComponent, ListLanguageComponent],
  imports: [
    CommonModule,
    LanguageRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [AddLanguageComponent, EditLanguageComponent]
})
export class LanguageModule { }
