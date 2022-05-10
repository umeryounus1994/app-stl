import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-edit-textures',
  templateUrl: './edit-textures.component.html',
  styleUrls: ['./edit-textures.component.scss']
})
export class EditTexturesComponent implements OnInit {
  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  name;
  description;
  partId;

  categoryIcon = [];
  categoryIconUrl = [];

  categoryDefaultImage = [];
  categoryDefaultImageUrl = [];
  Parts=[];
  userId;
  Categories = [];
  variationsList = [];
  languageId;
  categoryId;
  @Input() variationData;
  textureId;
  downloadedCategoryIcon = []
  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
   
    this.submitted = false;
    this.isDataLoaded = true;
    this.getParts();
    this.getLanguages();
    this.getVariations();
    this.textureId = this.variationData._id;
    this.name = this.variationData.name;
    this.description = this.variationData.description;
    this.partId = this.variationData.partId._id;
    this.languageId = this.variationData.languageId._id;
    this.categoryId = this.variationData.categoryId._id;
    this.downloadedCategoryIcon.push(this.variationData.textureFiles[0].imagePath)
  }

  getParts() {
    this.api.get('parts/get_all').then((response: any) => {
      this.Parts = response.data;
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
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

  _sendSaveRequest() {

    const formData: any = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('partId', this.partId);
      formData.append('languageId', this.languageId);
      formData.append('categoryId', this.categoryId);
      for(let i =0; i < this.categoryIcon.length; i++){
        formData.append("textureFiles", this.categoryIcon[i], this.categoryIcon[i]['name']);
      }

    this.api.patch('texture/update/',this.textureId, formData).then((response: any) => {

      this.helper.successBigToast('Success', 'Texture Successfully Updated!');
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
    if(this.languageId === '' || this.languageId == undefined) {
      this.helper.failureToast("Faliure"," Language is required");
      return false;
    }
    if(this.categoryId === '' || this.categoryId == undefined) {
      this.helper.failureToast("Faliure"," Category is required");
      return false;
    }
    if(this.description === '' || this.description == undefined) {
      this.helper.failureToast("Faliure"," Description is required");
      return false;
    }
    if(this.partId === '' || this.partId == undefined) {
      this.helper.failureToast("Faliure"," Part is required");
      return false;
    }    
    else{
      return true;
    }
  }

}
