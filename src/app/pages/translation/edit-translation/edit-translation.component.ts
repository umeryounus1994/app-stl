import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-edit-translation',
  templateUrl: './edit-translation.component.html',
  styleUrls: ['./edit-translation.component.scss']
})
export class EditTranslationComponent implements OnInit {
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
  @Input() variationData;
  menuId;
  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.submitted = false;
    this.isDataLoaded = true;
    this.getLanguages();
    this.getVariations();

    
    this.menuId = this.variationData._id;
    this.translatedText = this.variationData.translatedText;
    this.languageId = this.variationData.languageId._id;
    this.categoryId = this.variationData.categoryId._id;
    
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
        'categoryId': this.categoryId,
        'translatedText': this.translatedText,
        'languageId': this.languageId,
      };


      this.api.patch('translation/update/', this.menuId, d).then((response: any) => {

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
    if(this.categoryId === '' || this.categoryId == undefined) {
      this.helper.failureToast("Faliure"," Category is required");
      return false;
    }
    if(this.translatedText === '' || this.translatedText == undefined) {
      this.helper.failureToast("Faliure"," Translated Text is required");
      return false;
    }
    if(this.languageId === '' || this.languageId == undefined) {
      this.helper.failureToast("Faliure"," Language is required");
      return false;
    }
      
    else{
      return true;
    }
  }
}
