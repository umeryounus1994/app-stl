import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {

  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  itemName;
  subCategoryId;

  insertForm = {
    name : '',
    categoryId: '',
    variationFlag : '',
    variationId: '',
    description: '',
    width: '',
    height: '',
    price: '',
    productText: '',
    productLink: '',
    scalingFlag: '',
    defaultScaling: '',
    autoPlayFlag: '',
  };

  itemImage = [];
  itemImageUrl = [];

  itemModal = [];
  itemModalUrl = [];

  categoryIcon = [];
  categoryIconUrl = [];

  categoryDefaultImage = [];
  categoryDefaultImageUrl = [];

  scannedImage = [];
  scannedImageURL = [];

  userId;
  Categories = [];
  Variations = [];
  defaultImage = '/assets/images/fbx.png';

  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {

    this.submitted = false;
    this.isDataLoaded = true;
    this.getCategories();
    this.getVariations();
  }

  getCategories() {
    this.api.get('category/get_all').then((response: any) => {
      this.Categories = response.data;
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }
  getVariations() {
    this.api.get('variation/get_all').then((response: any) => {
      this.Variations = response.data;
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }

  submitData() {
    this.submitted = true;
    if (this.validate() == true) {
      this.isRequested = false;
      this._sendSaveRequest();
    }
  }

  _sendSaveRequest() {

    const formData: any = new FormData();
      formData.append('name', this.insertForm.name);
      formData.append('categoryId', this.insertForm.categoryId);
      formData.append('description', this.insertForm.description);
      formData.append('variationFlag', this.insertForm.variationFlag);
      formData.append('variationId', this.insertForm.variationId);
      formData.append('width', this.insertForm.width);
      formData.append('height', this.insertForm.height);
      formData.append('price', this.insertForm.price);
      formData.append('productText', this.insertForm.productText);
      formData.append('productLink', this.insertForm.productLink);
      formData.append('scalingFlag', this.insertForm.scalingFlag);
      formData.append('defaultScaling', this.insertForm.defaultScaling);
      formData.append('autoPlayFlag', this.insertForm.autoPlayFlag);
      
      for(let i =0; i < this.categoryIcon.length; i++){
        formData.append("model", this.categoryIcon[i], this.categoryIcon[i]['name']);
      }
      for(let i =0; i < this.categoryDefaultImage.length; i++){
        formData.append("productImage", this.categoryDefaultImage[i], this.categoryDefaultImage[i]['name']);
      }
      for(let i =0; i < this.scannedImage.length; i++){
        formData.append("scannedImage", this.scannedImage[i], this.scannedImage[i]['name']);
      }

    this.api.post('products/add', formData).then((response: any) => {

      this.helper.successBigToast('Success', 'Successfully added!');
      this.ngOnInit();

      this.isRequested = true;

      this.activeModal.close();

    }, (error: any) => {

      this.isRequested = true;

      if (error.error.Message) {
        // if (error.error.Message === 'Already Exists') {
        //   // tslint:disable-next-line: max-line-length
        //   this.helper.failureBigToast('Failed!', '"' + data.username + '" is already assigned to another user, kindly user different username for login.');
        //   return;
        // }
      }

      this.helper.failureBigToast('Failed!', 'Invalid data, kindly check all fields.');
    });
  }

  closeMe() {
    this.activeModal.close();
  }

  itemImageUpload(type){
    //$('#itemImage').trigger('click');
    if(type == 'categoryIcon'){
      $('#categoryIcon').trigger('click');
    } 
    if(type == 'categoryDefaultImage'){
      $('#categoryDefaultImage').trigger('click');
    }
    if(type == 'scannedImage'){
      $('#scannedImage').trigger('click');
    }
  }

  itemImageGetfiles(event,type){
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
    if(type == 'categoryDefaultImage'){
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

  if(type == 'scannedImage'){
    const files: Array<File> = event.target.files;

    if(this.scannedImageURL.length >0){
      alert("You can add only one Image");
      return false;
    }

    else{
      for(let i =0; i < files.length; i++){
        let reader = new FileReader();
        
        reader.onload = (e: any) => {
          this.scannedImageURL.push(e.target.result);
       }

      reader.readAsDataURL(files[i]);
      this.scannedImage.push(event.target.files[i]); 

    };
  }
}

  }


  removeImage(index,type){
    if(type=='categoryIcon'){
      this.categoryIcon.splice(index,1);
      this.categoryIconUrl.splice(index,1);
    } 
    if(type == 'categoryDefaultImage'){
      this.categoryDefaultImage.splice(index,1);
      this.categoryDefaultImageUrl.splice(index,1);
    }
    if(type == 'scannedImage'){
      this.scannedImage.splice(index,1);
      this.scannedImageURL.splice(index,1);
    }
  }

  validate(){
    if(this.insertForm.name == '' || this.insertForm.name == undefined) {
      this.helper.failureToast("Faliure","Name is required");
      return false;
    }
    if(this.insertForm.categoryId == '' || this.insertForm.categoryId == undefined) {
      this.helper.failureToast("Faliure","Category is required");
      return false;
    }
    if(this.insertForm.width == '' || this.insertForm.width == undefined) {
      this.helper.failureToast("Faliure","Width is required");
      return false;
    }
    if(this.insertForm.defaultScaling == '' || this.insertForm.defaultScaling == undefined) {
      this.helper.failureToast("Faliure","Default Scaling is required");
      return false;
    }
    if(this.categoryIconUrl.length == 0) {
      this.helper.failureToast("Faliure","Model is required");
      return false;
    }
    if(this.categoryDefaultImageUrl.length == 0) {
      this.helper.failureToast("Faliure","Product Image is required");
      return false;
    }
    if(this.scannedImageURL.length == 0) {
      this.helper.failureToast("Faliure","Image to Scan is required");
      return false;
    }
    
    else{
      return true;
    }
  }

  onChangeSubCategory(value){
    this.subCategoryId = value;
  }

}



