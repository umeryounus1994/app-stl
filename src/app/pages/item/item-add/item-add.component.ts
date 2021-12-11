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

  userId;
  Categories = [];
  Variations = [];

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

    if (this.validate()) {
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


      for(let i =0; i < this.itemImage.length; i++){
        formData.append("model", this.itemImage[i], this.itemImage[i]['name']);
      }

      console.log(this.insertForm);
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

  itemImageUpload(){
    $('#itemImage').trigger('click');
  }

  itemImageGetfiles(event){
    const files: Array<File> = event.target.files;

      console.log("this.itemImageUrl.length "+this.itemImageUrl.length)

      if(this.itemImageUrl.length >0){
        alert("You can add only one Image");
        return false;
      }

      else{

        for(let i =0; i < files.length; i++){
          let reader = new FileReader();
          
          reader.onload = (e: any) => {
            this.itemImageUrl.push(e.target.result);
         }

        reader.readAsDataURL(files[i]);
        this.itemImage.push(event.target.files[i]); 

      };
       
      console.log(this.itemImage)
      }

  }

  itemModalUpload(){
    $('#itemModal').trigger('click');
  }

  itemModalGetfiles(event){
    const files: Array<File> = event.target.files;

      console.log("this.itemModalUrl.length "+this.itemModalUrl.length)

      if(this.itemModalUrl.length >0){
        alert("You can add only one Image");
        return false;
      }

      else{

        for(let i =0; i < files.length; i++){
          let reader = new FileReader();
          
          reader.onload = (e: any) => {
            this.itemModalUrl.push(e.target.result);
         }

        reader.readAsDataURL(files[i]);
        this.itemModal.push(event.target.files[i]); 

      };
       
      console.log(this.itemModal)
      }

  }

  removeImage(index,type){
    if(type=='itemModal'){
      this.itemModalUrl.splice(index,1);
      this.itemModal.splice(index,1);
      console.log(this.itemModal)
    }
    if(type=='itemImage'){
      this.itemImageUrl.splice(index,1);
      this.itemImage.splice(index,1);
      console.log(this.itemImage)
    }
  }

  validate(){
    if(this.insertForm.name === '' || this.insertForm.name == undefined) {
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
    if(this.itemImageUrl.length == 0) {
      this.helper.failureToast("Faliure","Model Image is required");
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



