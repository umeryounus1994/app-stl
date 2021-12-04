import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  submitted = false;
  isDataLoaded = false;
  isRequested = true;

  adminResetForm: FormGroup;

  adminEmail;

  constructor(
    private fb: FormBuilder, 
    private api: RestApiService, 
    private helper: HelperService,
    private auth: AuthService, 
    private router: Router, 
    private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    // this.mapPinForm = this.fb.group({
    //   new FormControl({ value: '' }),
    //   pinCategoryId: [this.mapPin.pin_category_id.toString(), Validators.required],
    // })
    this.submitted = false;
    this.isDataLoaded = true;
  }

  // get f() { return this.mapPinForm.controls; }

  submitData() {
    this.submitted = true;

    if (this.validate()) {
      this.isRequested = false;
      this._sendSaveRequest();
    }
  }

  _sendSaveRequest() {

    
    const adminFormData = {email : this.adminEmail};

    this.api.post('admin/resetPassword', adminFormData).then((response: any) => {
      console.log(response)
      this.helper.successBigToast('Kindly Check Email', 'Admin Password Updated Successfully');
      this.ngOnInit();

      this.isRequested = true;

      this.activeModal.close();

    }, (error: any) => {

      this.isRequested = true;
       
      this.helper.failureBigToast('Error!', 'Email Dose not Exist');
    });
  }

  closeMe() {
    this.activeModal.close();
  }

  validate(){
    if(this.adminEmail === '' || this.adminEmail == undefined) {
      this.helper.failureToast("Faliure","Email is required");
      return false;
    }  
    else{
      return true;
    }
  }

}
