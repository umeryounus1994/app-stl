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
 

  // to show alreaded added images 
  downloadedCategoryImage=[]

  // For New image add and preview
  categoryImage = [];
  categoryImageUrl = [];

  

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
    console.log(this.categoryData)
    this.categoryId = this.categoryData._id;
    this.categoryName = this.categoryData.name;
   
    this.downloadedCategoryImage.push(this.categoryData.category_image)
    // this.downloadedCategoryImage = this.category.pin_category_image;
    // this.downloadedcategoryMapIcon = this.category.pin_category_map_icon;
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
      for(let i =0; i < this.categoryImage.length; i++){
        formData.append("category_image", this.categoryImage[i], this.categoryImage[i]['name']);
      }


    this.api.patch('category/update/', this.categoryId, formData).then((response: any) => {
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
      this.helper.failureToast("Faliure","Category Name is required");
      return false;
    }
    if(this.categoryImageUrl.length == 0 && this.downloadedCategoryImage.length == 0) {
      this.helper.failureToast("Faliure","Category Image is required");
      return false;
    }    
    else{
      return true;
    }
  }

}
