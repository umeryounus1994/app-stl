import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sub-category-add',
  templateUrl: './sub-category-add.component.html',
  styleUrls: ['./sub-category-add.component.scss']
})
export class SubCategoryAddComponent implements OnInit {

  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;
  categories;
 
  categoryId;

  subCategoryName;

  subCategoryImage = [];
  subCategoryImageUrl = [];

  userId;

  constructor(private fb: FormBuilder, private api: RestApiService, private helper: HelperService,
    private auth: AuthService, private router: Router, private activeModal: NgbActiveModal) {
    // if (this.auth.user.UserID) {
    //   this.userId = this.auth.user.UserID;
    // } else {
    //   this.router.navigateByUrl('auth/login');
    // }
  }

  ngOnInit() {

    this.submitted = false;
    this.isDataLoaded = true;
    this.getCategories();
  }


  getCategories() {
    this.api.get('category/get_all').then((response: any) => {
      this.categories = response.data;
      // this.pinCategories = this.pinCategories.reverse();
      console.log(this.categories)
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
      formData.append('name', this.subCategoryName);
      formData.append('category_id', this.categoryId);
      for(let i =0; i < this.subCategoryImage.length; i++){
        formData.append("sub_category_image", this.subCategoryImage[i], this.subCategoryImage[i]['name']);
      }

    this.api.post('sub_category/add', formData).then((response: any) => {

      this.helper.successBigToast('Success', 'Sub-Category Successfully Added!');
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

  subCategoryImageUpload(){
    $('#subCategoryImage').trigger('click');
  }

  subCategoryImageGetfiles(event){
    const files: Array<File> = event.target.files;

      console.log("this.subCategoryImageUrl.length "+this.subCategoryImageUrl.length)

      if(this.subCategoryImageUrl.length >0){
        alert("You can add only one Image");
        return false;
      }

      else{

        for(let i =0; i < files.length; i++){
          let reader = new FileReader();
          
          reader.onload = (e: any) => {
            this.subCategoryImageUrl.push(e.target.result);
         }

        reader.readAsDataURL(files[i]);
        this.subCategoryImage.push(event.target.files[i]); 

      };
       
      console.log(this.subCategoryImage)
      }

  }


  removeImage(index,type){
    if(type=='subCategoryImage'){
      this.subCategoryImageUrl.splice(index,1);
      this.subCategoryImage.splice(index,1);
      console.log(this.subCategoryImage)
    }
  }

  validate(){
    if(this.subCategoryName === '' || this.subCategoryName == undefined) {
      this.helper.failureToast("Faliure","Sub-Category Name is required");
      return false;
    }
    if(this.categoryId == '' || this.categoryId == undefined) {
      this.helper.failureToast("Faliure","Category is required");
      return false;
    }  
    if(this.subCategoryImageUrl.length == 0) {
      this.helper.failureToast("Faliure","Sub-Category Image is required");
      return false;
    }  
  
    else{
      return true;
    }
  }

  onChangeCategory(value){
    this.categoryId = value;
  }
}



