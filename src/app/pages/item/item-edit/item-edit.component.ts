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
  // to show alreaded added images 
  downloadedCategoryIcon=[];
  downloadedCategoryDefaultImage=[];
  downloadedscannedImage=[];

  // For New image add and preview
  categoryIcon = [];
  categoryIconUrl = [];

  categoryDefaultImage = [];
  categoryDefaultImageUrl = [];

  scannedImage = [];
  scannedImageURL = [];

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
    LangcategoryId: '',
    languageId: ''
  };
  defaultImage = '/assets/images/fbx.png';
  Languages = [];
  Translations = [];
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
    //this.insertForm.variationId = this.itemData.variationId._id;
    this.insertForm.description = this.itemData.description;
    this.insertForm.width = this.itemData.width;
    this.insertForm.height = this.itemData.height;
    this.insertForm.price = this.itemData.price;
    this.insertForm.productText = this.itemData.productText;
    this.insertForm.productLink = this.itemData.productLink;
    this.insertForm.scalingFlag = this.itemData.scalingFlag;
    this.insertForm.defaultScaling = this.itemData.defaultScaling;
    this.insertForm.autoPlayFlag = this.itemData.autoPlayFlag;
    this.insertForm.languageId = this.itemData.languageId._id;
    this.insertForm.LangcategoryId = this.itemData.languageCategoryId._id;

    this.downloadedCategoryIcon.push(this.itemData.model)
    this.downloadedCategoryDefaultImage.push(this.itemData.productImage);
    this.downloadedscannedImage.push(this.itemData.scannedImage);

    this.getCategories();
    this.getVariations();

    this.getLanguages();
    this.getTranslationCategories();
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


  getLanguages() {
    this.api.get('language/get_all').then((response: any) => {
      this.Languages = response.data;
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }
  getTranslationCategories() {
    this.api.get('transCat/get_all').then((response: any) => {
      this.Translations = response.data;
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
      //formData.append('variationId', this.insertForm.variationId);
      formData.append('width', this.insertForm.width);
      formData.append('height', this.insertForm.height);
      formData.append('price', this.insertForm.price);
      formData.append('productText', this.insertForm.productText);
      formData.append('productLink', this.insertForm.productLink);
      formData.append('scalingFlag', this.insertForm.scalingFlag);
      formData.append('defaultScaling', this.insertForm.defaultScaling);
      formData.append('autoPlayFlag', this.insertForm.autoPlayFlag);
      formData.append('languageId', this.insertForm.languageId);
      formData.append('languageCategoryId', this.insertForm.LangcategoryId);

      for(let i =0; i < this.categoryIcon.length; i++){
        formData.append("model", this.categoryIcon[i], this.categoryIcon[i]['name']);
      }
      for(let i =0; i < this.categoryDefaultImage.length; i++){
        formData.append("productImage", this.categoryDefaultImage[i], this.categoryDefaultImage[i]['name']);
      }
      // for(let i =0; i < this.scannedImage.length; i++){
      //   formData.append("scannedImage", this.scannedImage[i], this.scannedImage[i]['name']);
      // }

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

  itemImageUpload(type){
    if(type == 'categoryIcon'){
      $('#categoryIcon').trigger('click');
    } 
    if(type == 'categoryDefaultImage'){
      $('#categoryDefaultImage').trigger('click');
    }
    // if(type == 'scannedImage'){
    //   $('#scannedImage').trigger('click');
    // }
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

//   if(type == 'scannedImage'){
//     const files: Array<File> = event.target.files;

//     if(this.scannedImageURL.length >0){
//       alert("You can add only one Image");
//       return false;
//     }

//     else{
//       for(let i =0; i < files.length; i++){
//         let reader = new FileReader();
        
//         reader.onload = (e: any) => {
//           this.scannedImageURL.push(e.target.result);
//        }

//       reader.readAsDataURL(files[i]);
//       this.scannedImage.push(event.target.files[i]); 

//     };
//   }
// }

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
    // if(type == 'scannedImage'){
    //   this.scannedImage.splice(index,1);
    //   this.scannedImageURL.splice(index,1);
    // }
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
    if(this.categoryIconUrl.length == 0 && this.downloadedCategoryIcon.length == 0) {
      this.helper.failureToast("Faliure","Model is required");
      return false;
    }
    if(this.categoryDefaultImageUrl.length == 0 && this.downloadedCategoryDefaultImage.length == 0) {
      this.helper.failureToast("Faliure","Product Image is required");
      return false;
    }
    // if(this.scannedImage.length == 0 && this.downloadedscannedImage.length == 0) {
    //   this.helper.failureToast("Faliure","Image to Scan is required");
    //   return false;
    // }
    
    else{
      return true;
    }
  }

  onChangeSubCategory(value){
    this.subCategoryId = value;
  }




}
