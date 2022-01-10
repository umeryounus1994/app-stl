import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-variation-edit',
  templateUrl: './variation-edit.component.html',
  styleUrls: ['./variation-edit.component.scss']
})
export class VariationEditComponent implements OnInit {
  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  variationId;
  categoryForm: FormGroup;


  variationName;
  variationDescription;
 

  // to show alreaded added images 
  downloadedCategoryIcon=[];
  downloadedCategoryDefaultImage=[];

  // For New image add and preview
  categoryIcon = [];
  categoryIconUrl = [];

  categoryDefaultImage = [];
  categoryDefaultImageUrl = [];

  languageId;
  categoryId;

  @Input() variationData;
  Categories = [];
  variationsList = [];

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
    this.variationId = this.variationData._id;
    this.variationName = this.variationData.name;
    this.variationDescription = this.variationData.description;
   
    this.downloadedCategoryIcon.push(this.variationData.reference_image)
    this.downloadedCategoryDefaultImage.push(this.variationData.model_image);
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

  _sendSaveRequest() {

    const formData: any = new FormData();
      formData.append('name', this.variationName);
      formData.append('description', this.variationDescription);
      formData.append('languageId', this.languageId);
      formData.append('categoryId', this.categoryId);
      for(let i =0; i < this.categoryIcon.length; i++){
        formData.append("reference_image", this.categoryIcon[i], this.categoryIcon[i]['name']);
      }
      for(let i =0; i < this.categoryDefaultImage.length; i++){
        formData.append("model_image", this.categoryDefaultImage[i], this.categoryDefaultImage[i]['name']);
      }


    this.api.patch('variation/update/', this.variationId, formData).then((response: any) => {
      this.helper.successBigToast('Success', 'Successfully Updated!');
      this.ngOnInit();

      this.isRequested = true;

      this.activeModal.close();

    }, (error: any) => {

      this.isRequested = true;

      if (error.error.Message) {
      }

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
    if(this.variationName === '' || this.variationDescription == undefined) {
      this.helper.failureToast("Faliure"," Name and Description is required");
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
    if(this.categoryIconUrl.length == 0 && this.downloadedCategoryIcon.length == 0) {
      this.helper.failureToast("Faliure"," Reference Image is required");
      return false;
    }   
    if(this.categoryDefaultImageUrl.length == 0 && this.downloadedCategoryDefaultImage.length == 0) {
      this.helper.failureToast("Faliure"," Default Image is required");
      return false;
    }    
    else{
      return true;
    }
  }

}

