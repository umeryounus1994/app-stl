import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestApiService } from '../../../services/api/rest-api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  userForm: FormGroup;

  submitted = false;
  isDataLoaded = false;
  isRequested = true;
  paidBoolean = false;

  categoryName;

  categoryImage = [];
  categoryImageUrl = [];

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

    this.api.post('category/add', formData).then((response: any) => {

      this.helper.successBigToast('Success', 'Category Successfully Added!');
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
      this.helper.failureToast("Faliure","Pin Category Name is required");
      return false;
    }
    if(this.categoryImageUrl.length == 0) {
      this.helper.failureToast("Faliure","Pin Category Image is required");
      return false;
    }    
    else{
      return true;
    }
  }

}



