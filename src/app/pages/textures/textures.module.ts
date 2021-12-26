import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TexturesRoutingModule } from './textures-routing.module';
import { AddTexturesComponent } from './add-textures/add-textures.component';
import { EditTexturesComponent } from './edit-textures/edit-textures.component';
import { ListTexturesComponent } from './list-textures/list-textures.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [AddTexturesComponent, EditTexturesComponent, ListTexturesComponent],
  imports: [
    CommonModule,
    TexturesRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [AddTexturesComponent, EditTexturesComponent]
})
export class TexturesModule { }
