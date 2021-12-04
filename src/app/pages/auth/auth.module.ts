import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [LoginComponent, ForgetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [ForgetPasswordComponent]
})
export class AuthModule { }
