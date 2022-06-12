import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { TokenlistComponent } from './tokenlist/tokenlist.component';
import { TokenAddComponent } from './token-add/token-add.component';
import { TokenEditComponent } from './token-edit/token-edit.component';

@NgModule({
  declarations: [UsersListComponent, UsersAddComponent, UsersEditComponent, TokenlistComponent, TokenAddComponent, TokenEditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [UsersAddComponent, UsersEditComponent, TokenAddComponent, TokenEditComponent]
})
export class UsersModule { }
