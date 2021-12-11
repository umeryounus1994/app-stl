import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemListComponent } from '../item-list/item-list.component';
@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  itemId;
  itemForm: FormGroup;


  itemName;
  subCategoryId;
  subCategories;



  // to show alreaded added images 
  downloadedItemImage=[]
  downloadedItemModal=[]


  // For New image add and preview
  itemImage = [];
  itemImageUrl = [];

  itemModal = [];
  itemModalUrl = [];

  Categories = [];
  Variations = [];
  @Input() itemData;
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
    this.itemId = this.itemData._id;
    this.insertForm.name = this.itemData.name;
    this.insertForm.categoryId = this.itemData.categoryId._id;
    this.insertForm.variationFlag = this.itemData.variationFlag;
    this.insertForm.variationId = this.itemData.variationId._id;
    this.insertForm.description = this.itemData.description;
    this.insertForm.width = this.itemData.width;
    this.insertForm.height = this.itemData.height;
    this.insertForm.price = this.itemData.price;
    this.insertForm.productText = this.itemData.productText;
    this.insertForm.productLink = this.itemData.productLink;
    this.insertForm.scalingFlag = this.itemData.scalingFlag;
    this.insertForm.defaultScaling = this.itemData.defaultScaling;
    this.insertForm.autoPlayFlag = this.itemData.autoPlayFlag;

    this.downloadedItemImage.push(this.itemData.model)

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

    this.api.patch('products/update/', this.itemId, formData).then((response: any) => {
      this.helper.successBigToast('Success', 'Successfully Updated!');
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
       
      }

  }

  itemModalUpload(){
    $('#itemModal').trigger('click');
  }

  itemModalGetfiles(event){
    const files: Array<File> = event.target.files;

      console.log("this.itemModalUrl.length "+this.itemModalUrl.length)

      if(this.itemModalUrl.length >0){
        alert("You can add only one File");
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
    
    else{
      return true;
    }
  }

  onChangeSubCategory(value){
    this.subCategoryId = value;
  }




}
