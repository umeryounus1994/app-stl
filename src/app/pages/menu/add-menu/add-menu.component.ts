import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  name;
  description;
  pageTitle;
  pageText;
  downLeftBtnHyperlink;
  downLeftBtnText;
  downRightConfirmBtnText;

  categoryIcon = [];
  categoryIconUrl = [];

  categoryDefaultImage = [];
  categoryDefaultImageUrl = [];

  userId;
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

    const formData: any = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('pageTitle', this.pageTitle);
      formData.append('pageText', this.pageText);
      formData.append('downLeftBtnHyperlink', this.downLeftBtnHyperlink);
      formData.append('downLeftBtnText', this.downLeftBtnText);
      formData.append('downRightConfirmBtnText', this.downRightConfirmBtnText);
      for(let i =0; i < this.categoryIcon.length; i++){
        formData.append("icon", this.categoryIcon[i], this.categoryIcon[i]['name']);
      }
      for(let i =0; i < this.categoryDefaultImage.length; i++){
        formData.append("downRightConfirmBtnIcon", this.categoryDefaultImage[i], this.categoryDefaultImage[i]['name']);
      }

    this.api.post('menu/add', formData).then((response: any) => {

      this.helper.successBigToast('Success', 'Menu Successfully Added!');
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

  categoryImageUpload(type){
    if(type == 'categoryIcon'){
      $('#categoryIcon').trigger('click');
    } else {
      $('#categoryDefaultImage').trigger('click');
    }
  }

  categoryImageGetfiles(event, type){
    if(type == 'categoryIcon'){
      const files: Array<File> = event.target.files;

      if(this.categoryIconUrl.length >0){
        alert("You can add only one Image");
        return false;
      }

      else{

        for(let i =0; i < files.length; i++){
          let reader = new FileReader();
          
          reader.onload = (e: any) => {
            this.categoryIconUrl.push(e.target.result);
         }

        reader.readAsDataURL(files[i]);
        this.categoryIcon.push(event.target.files[i]); 

      };
      }
    } else {
      const files: Array<File> = event.target.files;

      if(this.categoryDefaultImageUrl.length >0){
        alert("You can add only one Image");
        return false;
      }

      else{

        for(let i =0; i < files.length; i++){
          let reader = new FileReader();
          
          reader.onload = (e: any) => {
            this.categoryDefaultImageUrl.push(e.target.result);
         }

        reader.readAsDataURL(files[i]);
        this.categoryDefaultImage.push(event.target.files[i]); 

      };
    }
  }
    

  }


  removeImage(index,type){
    if(type=='categoryIcon'){
      this.categoryIcon.splice(index,1);
      this.categoryIconUrl.splice(index,1);
    } else {
      this.categoryDefaultImage.splice(index,1);
      this.categoryDefaultImageUrl.splice(index,1);
    }
  }

  validate(){
    if(this.name === '' || this.name == undefined) {
      this.helper.failureToast("Faliure"," Name is required");
      return false;
    }
    if(this.pageTitle === '' || this.pageTitle == undefined) {
      this.helper.failureToast("Faliure"," Page Title is required");
      return false;
    }
    if(this.pageText === '' || this.pageText == undefined) {
      this.helper.failureToast("Faliure"," Page Text is required");
      return false;
    }
    if(this.categoryIconUrl.length == 0) {
      this.helper.failureToast("Faliure"," Icon is required");
      return false;
    }   
    if(this.categoryDefaultImageUrl.length == 0) {
      this.helper.failureToast("Faliure"," Down Right Confirm Button Icon is required");
      return false;
    }    
    else{
      return true;
    }
  }

}
