import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../../services/api/rest-api.service';
import { HelperService } from '../../services/helper/helper.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  submitted = false;
  isDataLoaded = false;
  isRequested = true;

  adminResetForm: FormGroup;

  adminPassword;
  adminPassword2;
  adminData;

  constructor(
    private fb: FormBuilder, 
    private api: RestApiService, 
    private helper: HelperService,
    private auth: AuthService, 
    private router: Router, 
    private activeModal: NgbActiveModal) {
  }
  
  ngOnInit() {

    this.submitted = false;
    this.isDataLoaded = true;
    this.adminData = this.auth.getLocalTokens();
    console.log(this.adminData)
  }


  submitData() {
    this.submitted = true;

    if (this.validate()) {
      this.isRequested = false;
      this._sendSaveRequest();
    }
  }

  _sendSaveRequest() {

    
    const adminFormData = {password : this.adminPassword};

    this.api.patch('admin/update_password/',this.adminData.id, adminFormData).then((response: any) => {
      console.log(response)
      this.helper.successBigToast('Success', 'Admin Password Updated Successfully');
      this.ngOnInit();

      this.isRequested = true;

      this.activeModal.close();

    }, (error: any) => {

      this.isRequested = true;
       
      this.helper.failureBigToast('Error!', 'Password not changed');
    });
  }

  closeMe() {
    this.activeModal.close();
  }

  validate(){
    if(this.adminPassword === '' || this.adminPassword == undefined) {
      this.helper.failureToast("","Password is required");
      return false;
    }  
    if(this.adminPassword2 === '' || this.adminPassword2 == undefined) {
      this.helper.failureToast("","Re-Enter Password is required");
      return false;
    } 
    if(this.adminPassword != this.adminPassword2) {
      this.helper.failureToast("","Password and Re-Enter Password didnt matched");
      return false;
    }  
    else{
      return true;
    }
  }

}
