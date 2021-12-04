import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../../../services/helper/helper.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ForgetPasswordComponent} from '../forget-password/forget-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  spinnerText = '';

  constructor(private auth: AuthService, private router: Router, private helper: HelperService,  private spinnerService: NgxSpinnerService, private modalService: NgbModal) {
    if (this.auth.isLoggedIn) {
      this.router.navigateByUrl('dashboard/customer');
    }
  }
  ngOnInit() {
  }

  onSubmit(form: NgModel) {
    // console.log(form.value);

    if (form.valid) {

      this.isSubmitted = true;

      this.spinnerService.show();
      this.spinnerText = 'Logging in Admin...';

      this.auth.login(form.value).then((data: any) => {

        this.isSubmitted = false;

        // console.log(data);

        if (data === 'open') {

          this.spinnerService.hide();

          this.helper.successToast('Successfully Authenticated!', 'Welcome Admin' );

          console.log('role', this.auth.user.role);

          if (this.auth.user.role === 0) {
            this.router.navigateByUrl('dashboard/admin');
          } else if (this.auth.user.role === 1) {
            this.router.navigateByUrl('dashboard/customer');
          } else {
            this.helper.infoToast('Invalid User', 'Contact Administrator!');
          }

        } else if (data === 'locked') {

          this.spinnerService.hide();
          this.helper.failureBigToast('Failed!', 'Your account is locked, kindly contact administrator.');

        } else {

          this.spinnerService.hide();
          this.helper.failureBigToast('Failed!', 'Incorrect username or password.');
          // this.helper.failureToast('Incorrect username or password', 'Authentication Failed!');
        }

      });
    }
  }


  forgetPassword() {
    const modalRef = this.modalService.open(ForgetPasswordComponent);
    modalRef.result.then(() => { });
  }

}
