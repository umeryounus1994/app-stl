import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/services/api/rest-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-add-parts',
  templateUrl: './add-parts.component.html',
  styleUrls: ['./add-parts.component.scss']
})
export class AddPartsComponent implements OnInit {
  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  name;
  description;
  productId;
  languageId;
  categoryId;
  categoryIcon = [];
  categoryIconUrl = [];

  categoryDefaultImage = [];
  categoryDefaultImageUrl = [];
  Products;
  userId;
  Categories = [];
  variationsList = [];
  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    this.submitted = false;
    this.isDataLoaded = true;
    this.getProducts();
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
  getProducts() {
    this.api.get('products/get_all').then((response: any) => {
      this.Products = response.data;
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

    this.api.post('parts/add', formData).then((response: any) => {

      this.helper.successBigToast('Success', 'Part Successfully Added!');
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
      this.helper.failureToast("Failure"," Name is required");
      return false;
    }
    if(this.languageId === '' || this.languageId == undefined) {
      this.helper.failureToast("Failure"," Language is required");
      return false;
    }
    if(this.categoryId === '' || this.categoryId == undefined) {
      this.helper.failureToast("Failure"," Category is required");
      return false;
    }
    if(this.description === '' || this.description == undefined) {
      this.helper.failureToast("Failure"," Description is required");
      return false;
    }
    if(this.productId === '' || this.productId == undefined) {
      this.helper.failureToast("Failure"," Product is required");
      return false;
    }
    if(this.categoryIconUrl.length == 0) {
      this.helper.failureToast("Failure"," Image is required");
      return false;
    }       
    else{
      return true;
    }
  }

}

