import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { Router } from '@angular/router';
import { HelperService } from '../../../services/helper/helper.service';
import { ItemAddComponent } from '../item-add/item-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemEditComponent } from '../item-edit/item-edit.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  isDataLoaded = false;
  userId;
  pinCategories = [];

  

  dtOptions: DataTables.Settings = {};


  constructor(private api: RestApiService, private router: Router, private helper: HelperService, private modalService: NgbModal,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    console.log("ngOnInit called")
    this.getItems();
  }


  getItems() {
    this.api.get('item/get_all').then((response: any) => {
      this.pinCategories = response.data;
      // this.pinCategories = this.pinCategories.reverse();
      console.log(this.pinCategories)
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }

  openAddModal() {
    const modalRef = this.modalService.open(ItemAddComponent);

    modalRef.result.then(() => { this.ngOnInit(); }, () => { this.ngOnInit(); });
  }

  selectedPinCategory(itemData) {
     this._openEditModal(itemData);
  }

  _openEditModal(itemData) {
    const modalRef = this.modalService.open(ItemEditComponent);
    modalRef.componentInstance.itemData = itemData;
    modalRef.result.then(() => { this.ngOnInit(); }, () => { this.ngOnInit(); });
  }

  deletePinCategory(pinCategoryId) {
    let text = 'You want to delete this Item?';
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

      const formData: any = new FormData();
      formData.append('state', "deleted");
        this.spinner.show();
        this.api.get('item/remove_by_id/'+pinCategoryId)
        .then((response: any) => {
          if (response.status === true) {
            this.spinner.hide();
            this.helper.successToast('Success', "Item Deleted Successfully");
            this.getItems();
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
        this.helper.infoToast('', "Item is not deleted");
        // Swal(
        //   'Cancelled',
        //   'Pin Category not deleted :)',
        //   'error'
        // );
      }
    });
  }
}
