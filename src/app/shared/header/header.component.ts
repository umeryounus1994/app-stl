import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
declare var $: any;
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PasswordResetComponent} from '../password-reset/password-reset.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    $.getScript('assets/js/script.js');
  }

  passwordReset(){
      const modalRef = this.modalService.open(PasswordResetComponent);
      modalRef.result.then(() => { });
  }
}
