import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.scss']
})
export class AddTranslationComponent implements OnInit {
  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;
  actualText;
  translatedText;
  languageId;
  categoryId;

  userId;
  Categories = [];
  variationsList = [];
  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.submitted = false;
    this.isDataLoaded = true;
    this.getLanguages();
    this.getVariations();
  }

  getLanguages() {
    this.api.get('language/get_all').then((response: any) => {
      this.Categories = response.data;
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }
  getVariations() {
    this.api.get('transCat/get_all').then((response: any) => {
      this.variationsList = response.data;
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }
  submitData() {
    this.submitted = true;

    if (this.validate()) {
      this.isRequested = false;
      this._sendSaveRequest();
    }
  }
  closeMe() {
    this.activeModal.close();
  }
  _sendSaveRequest() {

      var d = {
        'translatedText': this.translatedText,
        'languageId': this.languageId,
        'categoryId': this.categoryId
      };


    this.api.post('translation/add', d).then((response: any) => {

      this.helper.successBigToast('Success', 'Translation Successfully Added!');
      this.ngOnInit();

      this.isRequested = true;

      this.activeModal.close();

    }, (error: any) => {
      this.isRequested = true;
      this.helper.failureBigToast('Failed!', 'Invalid data, kindly check all fields.');
    });
  }
  validate(){
    if(this.translatedText === '' || this.translatedText == undefined) {
      this.helper.failureToast("Faliure"," Translated Text is required");
      return false;
    }
    if(this.languageId === '' || this.languageId == undefined) {
      this.helper.failureToast("Faliure"," Language is required");
      return false;
    }
    if(this.categoryId === '' || this.categoryId == undefined) {
      this.helper.failureToast("Faliure"," Category is required");
      return false;
    }
      
    else{
      return true;
    }
  }
}
