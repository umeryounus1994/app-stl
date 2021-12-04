import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubCategoryListComponent } from '../sub-category-list/sub-category-list.component';
@Component({
  selector: 'app-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.scss']
})
export class SubCategoryEditComponent implements OnInit {

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  categoryId;
  subCategoryId;
  categories;
  categoryForm: FormGroup;


  categoryName;
 

  // to show alreaded added images 
  downloadedCategoryImage=[]

  // For New image add and preview
  categoryImage = [];
  categoryImageUrl = [];

  

  @Input() subCategoryData;

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
    console.log(this.subCategoryData)
    this.categoryId = this.subCategoryData.category_id._id;
    this.subCategoryId = this.subCategoryData._id;
    this.categoryName = this.subCategoryData.name;
   
    this.downloadedCategoryImage.push(this.subCategoryData.sub_category_image)
    
    this.getCategories()
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
      formData.append('name', this.categoryName);
      formData.append('category_id', this.categoryId);
      for(let i =0; i < this.categoryImage.length; i++){
        formData.append("sub_category_image", this.categoryImage[i], this.categoryImage[i]['name']);
      }


    this.api.patch('sub_category/update/', this.subCategoryId, formData).then((response: any) => {
      console.log(response)
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

  categoryImageUpload(){
    $('#categoryImage').trigger('click');
  }

  categoryImageGetfiles(event){
    const files: Array<File> = event.target.files;

      console.log("this.categoryImageUrl.length "+this.categoryImageUrl.length)

      if(this.categoryImageUrl.length >0){
        alert("You can add only one Image");
        return false;
      }

      else{

        for(let i =0; i < files.length; i++){
          let reader = new FileReader();
          
          reader.onload = (e: any) => {
            this.categoryImageUrl.push(e.target.result);
         }

        reader.readAsDataURL(files[i]);
        this.categoryImage.push(event.target.files[i]); 

      };
       
      console.log(this.categoryImage)
      }

  }


  removeImage(index,type){
    if(type=='categoryImage'){
      this.categoryImageUrl.splice(index,1);
      this.categoryImage.splice(index,1);
      console.log(this.categoryImage)
    }
  }

  validate(){
    if(this.categoryName === '' || this.categoryName == undefined) {
      this.helper.failureToast("Faliure","Sub-Category Name is required");
      return false;
    }
    if(this.categoryId == '' || this.categoryId == undefined) {
      this.helper.failureToast("Faliure","Category is required");
      return false;
    }  
    if(this.categoryImageUrl.length == 0 && this.downloadedCategoryImage.length == 0) {
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
