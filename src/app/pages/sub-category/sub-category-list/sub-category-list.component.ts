import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { Router } from '@angular/router';
import { HelperService } from '../../../services/helper/helper.service';
import { SubCategoryAddComponent } from '../sub-category-add/sub-category-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubCategoryEditComponent } from '../sub-category-edit/sub-category-edit.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

  isDataLoaded = false;
  userId;
  subCategories = [];

  

  dtOptions: DataTables.Settings = {};


  constructor(private api: RestApiService, private router: Router, private helper: HelperService, private modalService: NgbModal,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    console.log("ngOnInit called")
    this.getSubCategories();
  }


  getSubCategories() {
    this.api.get('sub_category/get_all').then((response: any) => {
      this.subCategories = response.data;
      // this.subCategories = this.subCategories.reverse();
      console.log(this.subCategories)
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }

  openAddModal() {
    const modalRef = this.modalService.open(SubCategoryAddComponent);

    modalRef.result.then(() => { this.ngOnInit(); }, () => { this.ngOnInit(); });
  }

  selectedSubCategory(subCategoryData) {
    console.log("subCategoryData ",subCategoryData)
     this._openEditModal(subCategoryData);
  }

  _openEditModal(subCategoryData) {
    const modalRef = this.modalService.open(SubCategoryEditComponent);
    modalRef.componentInstance.subCategoryData = subCategoryData;
    modalRef.result.then(() => { this.ngOnInit(); }, () => { this.ngOnInit(); });
  }

  deleteSubCategory(categoryId) {
    let text = 'You want to delete this Sub-Category?';
    Swal({
      title: 'Are you sure?',
      text: text,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.api.get('sub_category/remove_by_id/'+categoryId)
        .then((response: any) => {
          if (response.status === true) {
            this.spinner.hide();
            this.helper.successToast('Success', "Sub-Category Deleted Successfully");
            this.getSubCategories();
          } else {
            this.spinner.hide();
            this.helper.failureToast('Status', response.message);
          }
        }, err => {
          this.spinner.hide();
        });
      } else if (
        // Read more about handling dismissals
        // tslint:disable-next-line: deprecation
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.helper.infoToast('', "Sub-Category is not deleted");
        // Swal(
        //   'Cancelled',
        //   'Pin Category not deleted :)',
        //   'error'
        // );
      }
    });
  }
}
