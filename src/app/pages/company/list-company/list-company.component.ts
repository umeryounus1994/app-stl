import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../../services/api/rest-api.service';
import { Router } from '@angular/router';
import { HelperService } from '../../../services/helper/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {
  isDataLoaded = false;
  userId;
  variationsList = [];

  dtOptions: DataTables.Settings = {};

  constructor(private api: RestApiService, private router: Router, private helper: HelperService, private modalService: NgbModal,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getVariations();
  }


  getVariations() {
    this.api.get('company/get_all').then((response: any) => {
      this.variationsList = response.data;
      this.isDataLoaded = true;
    }).catch(err => console.log('Error', err));
  }

  openAddModal() {
    const modalRef = this.modalService.open(AddCompanyComponent);

    modalRef.result.then(() => { this.ngOnInit(); }, () => { this.ngOnInit(); });
  }

  selectedVariation(variationData) {
     this._openEditModal(variationData);
  }

  _openEditModal(variationData) {
    const modalRef = this.modalService.open(EditCompanyComponent);
    modalRef.componentInstance.variationData = variationData;
    modalRef.result.then(() => { this.ngOnInit(); }, () => { this.ngOnInit(); });
  }

  deleteVariation(variationId) {
    let text = 'You want to delete this Company Info?';
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
        this.api.patch('company/update/',variationId, formData)
        .then((response: any) => {
          if (response.status === true) {
            this.spinner.hide();
            this.helper.successToast('Success', "Company Info Deleted Successfully");
            this.getVariations();
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
        this.helper.infoToast('', "Company Info is not deleted");
        // Swal(
        //   'Cancelled',
        //   'Pin Category not deleted :)',
        //   'error'
        // );
      }
    });
  }
}

