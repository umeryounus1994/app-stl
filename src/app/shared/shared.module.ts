import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import {PasswordResetComponent} from './password-reset/password-reset.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, ChatSidebarComponent, ToggleFullscreenDirective, PasswordResetComponent],
  imports: [CommonModule, RouterModule, NgbModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, ChatSidebarComponent, ToggleFullscreenDirective],
  entryComponents: [PasswordResetComponent]
})
export class SharedModule { }
