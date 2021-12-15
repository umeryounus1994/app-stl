import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationRoutingModule } from './translation-routing.module';
import { AddTranslationComponent } from './add-translation/add-translation.component';
import { EditTranslationComponent } from './edit-translation/edit-translation.component';
import { ListTranslationComponent } from './list-translation/list-translation.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [AddTranslationComponent, EditTranslationComponent, ListTranslationComponent],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [AddTranslationComponent, EditTranslationComponent]
})
export class TranslationModule { }
