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


  @Input() itemData;

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
    console.log(this.itemData)
    this.itemId = this.itemData._id;
    this.itemName = this.itemData.name;
    this.subCategoryId = this.itemData.sub_category_id._id;
    this.downloadedItemImage.push(this.itemData.item_image)
    this.downloadedItemModal.push(this.itemData.item_modal)

    this.getSubCategories();
  }


  getSubCategories() {
    this.api.get('sub_category/get_all').then((response: any) => {
      this.subCategories = response.data;
      console.log(this.subCategories)
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
      formData.append('name', this.itemName);
      formData.append('sub_category_id', this.subCategoryId);

      for(let i =0; i < this.itemImage.length; i++){
        formData.append("item_image", this.itemImage[i], this.itemImage[i]['name']);
      }
      for(let i =0; i < this.itemModal.length; i++){
        formData.append("item_modal", this.itemModal[i], this.itemModal[i]['name']);
      }

    this.api.patch('item/update/', this.itemId, formData).then((response: any) => {
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
    if(this.itemName === '' || this.itemName == undefined) {
      this.helper.failureToast("Faliure","Item Name is required");
      return false;
    }
    if(this.subCategoryId == '' || this.subCategoryId == undefined) {
      this.helper.failureToast("Faliure","Sub Category is required");
      return false;
    }
    if(this.itemImageUrl.length == 0 && this.downloadedItemImage.length == 0) {
      this.helper.failureToast("Faliure","Item Image is required");
      return false;
    }
    if(this.itemModalUrl.length == 0 && this.downloadedItemModal.length == 0) {
      this.helper.failureToast("Faliure","Item Modal / File is required");
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
