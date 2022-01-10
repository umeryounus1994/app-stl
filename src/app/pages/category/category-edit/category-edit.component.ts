import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryListComponent } from '../category-list/category-list.component';
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  categoryId;
  categoryForm: FormGroup;


  categoryName;
  categoryDescription;
  languageId;
  catId;

  // to show alreaded added images 
  downloadedCategoryIcon=[];
  downloadedCategoryDefaultImage=[];

  // For New image add and preview
  categoryIcon = [];
  categoryIconUrl = [];

  categoryDefaultImage = [];
  categoryDefaultImageUrl = [];

  Categories = [];
  variationsList = [];

  @Input() categoryData;

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
    this.categoryId = this.categoryData._id;
    this.languageId = this.categoryData.languageId._id;
    this.catId = this.categoryData.categoryId._id;
    this.categoryName = this.categoryData.name;
    this.categoryDescription = this.categoryData.description;
   
    this.downloadedCategoryIcon.push(this.categoryData.category_icon)
    this.downloadedCategoryDefaultImage.push(this.categoryData.category_default_image);
    this.getLanguages();
    this.getVariations();
  }

  submitData() {
    this.submitted = true;

    if (this.validate()) {
      this.isRequested = false;
      this._sendSaveRequest();
    }
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
  _sendSaveRequest() {

    const formData: any = new FormData();
      formData.append('name', this.categoryName);
      formData.append('description', this.categoryDescription);
      formData.append('languageId', this.languageId);
      formData.append('categoryId', this.catId);
      for(let i =0; i < this.categoryIcon.length; i++){
        formData.append("category_icon", this.categoryIcon[i], this.categoryIcon[i]['name']);
      }
      for(let i =0; i < this.categoryDefaultImage.length; i++){
        formData.append("category_default_image", this.categoryDefaultImage[i], this.categoryDefaultImage[i]['name']);
      }


    this.api.patch('category/update/', this.categoryId, formData).then((response: any) => {
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
    if(this.categoryName === '' || this.categoryName == undefined) {
      this.helper.failureToast("Faliure"," Category Name is required");
      return false;
    }
    if(this.languageId === '' || this.languageId == undefined) {
      this.helper.failureToast("Faliure"," Language is required");
      return false;
    }
    if(this.catId === '' || this.catId == undefined) {
      this.helper.failureToast("Faliure"," Category is required");
      return false;
    }
    if(this.categoryIconUrl.length == 0 && this.downloadedCategoryIcon.length == 0) {
      this.helper.failureToast("Faliure"," Category Icon is required");
      return false;
    }   
    if(this.categoryDefaultImageUrl.length == 0 && this.downloadedCategoryIcon.length == 0) {
      this.helper.failureToast("Faliure"," Category Default Image is required");
      return false;
    }    
    else{
      return true;
    }
  }

}
