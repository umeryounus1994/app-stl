import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-edit-parts',
  templateUrl: './edit-parts.component.html',
  styleUrls: ['./edit-parts.component.scss']
})
export class EditPartsComponent implements OnInit {
  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  name;
  description;
  productId;

  categoryIcon = [];
  categoryIconUrl = [];

  categoryDefaultImage = [];
  categoryDefaultImageUrl = [];
  Products;
  userId;
  variationId;
  @Input() variationData;
  downloadedCategoryIcon=[];
  Categories = [];
  variationsList = [];
  languageId;
  categoryId;
  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    this.submitted = false;
    this.isDataLoaded = true;
    this.getProducts();
    this.getLanguages();
    this.getVariations();
    this.variationId = this.variationData._id;
    this.name = this.variationData.name;
    this.description = this.variationData.description;
    this.productId = this.variationData.productId._id;
    this.downloadedCategoryIcon.push(this.variationData.imageFile)
    this.languageId = this.variationData.languageId._id;
    this.categoryId = this.variationData.categoryId._id;

  }
  getProducts() {
    this.api.get('products/get_all').then((response: any) => {
      this.Products = response.data;
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
      formData.append('productId', this.productId);
      formData.append('languageId', this.languageId);
      formData.append('categoryId', this.categoryId);
      for(let i =0; i < this.categoryIcon.length; i++){
        formData.append("imageFile", this.categoryIcon[i], this.categoryIcon[i]['name']);
      }

      this.api.patch('parts/update/', this.variationId, formData).then((response: any) => {

      this.helper.successBigToast('Success', 'Part Updated Added!');
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
    if(this.productId === '' || this.productId == undefined) {
      this.helper.failureToast("Faliure"," Product is required");
      return false;
    }
    if(this.categoryIconUrl.length == 0 && this.downloadedCategoryIcon.length == 0) {
      this.helper.failureToast("Faliure"," Image is required");
      return false;
    }       
    else{
      return true;
    }
  }

}