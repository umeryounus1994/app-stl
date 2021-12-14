import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  name;
  introVideo;
  hyperlink;
 

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
      formData.append('introVideo', this.introVideo);
      formData.append('hyperlink', this.hyperlink);
      for(let i =0; i < this.categoryIcon.length; i++){
        formData.append("logo", this.categoryIcon[i], this.categoryIcon[i]['name']);
      }


    this.api.post('company/add', formData).then((response: any) => {

      this.helper.successBigToast('Success', 'Company Info Successfully Added!');
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
    }
  }


  removeImage(index,type){
    if(type=='categoryIcon'){
      this.categoryIcon.splice(index,1);
      this.categoryIconUrl.splice(index,1);
    }
  }

  validate(){
    if(this.name === '' || this.name == undefined) {
      this.helper.failureToast("Faliure"," Name is required");
      return false;
    }
    if(this.introVideo === '' || this.introVideo == undefined) {
      this.helper.failureToast("Faliure"," Intro Video Flag is required");
      return false;
    }
    if(this.hyperlink === '' || this.hyperlink == undefined) {
      this.helper.failureToast("Faliure","Hyperlink is required");
      return false;
    }
    if(this.categoryIconUrl.length == 0) {
      this.helper.failureToast("Faliure"," Logo is required");
      return false;
    }     
    else{
      return true;
    }
  }

}
