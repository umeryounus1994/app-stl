import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-token-add',
  templateUrl: './token-add.component.html',
  styleUrls: ['./token-add.component.scss']
})
export class TokenAddComponent implements OnInit {

  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  license;
  state = 'active';
  licenseUsed = 'active';

  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    this.submitted = false;
    this.isDataLoaded = true;

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
        "licenseUsed": this.licenseUsed,
        "license": this.license,
        "state": this.state
      }

    this.api.post('tokens/add', d).then((response: any) => {

      this.helper.successBigToast('Success', 'License Number Successfully Added!');
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
    if(this.license === '' || this.license == undefined) {
      this.helper.failureToast("Faliure","License Number is required");
      return false;
    }    

    else{
      return true;
    }
  }

}

