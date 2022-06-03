import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  firstname;
  lastname;
  phoneNo;
  email;
  password;
  state = 'active';
  role = 1;
  userId;

  @Input() variationData;
  menuId;

  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    this.submitted = false;
    this.isDataLoaded = true;

    this.menuId = this.variationData._id;
    this.firstname = this.variationData.firstname;
    this.lastname = this.variationData.lastname;
    this.phoneNo = this.variationData.phoneNo;
    this.email = this.variationData.email;

  }
  submitData() {
    this.submitted = true;

    if (this.validate()) {
      this.isRequested = false;
      this._sendSaveRequest();
    }
  }

  _sendSaveRequest() {
      var d = {
        "firstname": this.firstname,
        "lastname": this.lastname,
        "phoneNo": this.phoneNo,
        "email": this.email,
        "password": this.password,
        "state": this.state,
        "role": this.role
      }

    this.api.patch('admin/updateAdmin/', this.menuId, d).then((response: any) => {

      this.helper.successBigToast('Success', 'User Successfully Updated!');
      this.ngOnInit();

      this.isRequested = true;

      this.activeModal.close();

    }, (error: any) => {
      this.isRequested = true;
      this.helper.failureBigToast('Failed!', 'Invalid data, kindly check all fields.');
    });
  }

  closeMe() {
    this.activeModal.close();
  }

  validate(){
    if(this.firstname === '' || this.firstname == undefined) {
      this.helper.failureToast("Faliure","First Name is required");
      return false;
    }    
    if(this.lastname === '' || this.lastname == undefined) {
      this.helper.failureToast("Faliure","Last Name is required");
      return false;
    }  
    if(this.phoneNo === '' || this.phoneNo == undefined) {
      this.helper.failureToast("Faliure","Phone No is required");
      return false;
    }  
    if(this.email === '' || this.email == undefined) {
      this.helper.failureToast("Faliure","Email is required");
      return false;
    }    
    else{
      return true;
    }
  }

}
