import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { EncryptionPassword } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toastrService: ToastrService) { }

  // Toasts:
  successToast(title, message) {
    this.toastrService.success(title, message);
  }
  infoToast(title, message) {
    this.toastrService.info(title, message);
  }
  warningToast(title, message) {
    this.toastrService.warning(title, message);
  }
  failureToast(title, message) {
    this.toastrService.error(title, message);
  }

  successBigToast(title, messsage) {
    Swal({
      type: 'success',
      title: title,
      text: messsage
      // showConfirmButton: true,
    });
  }
  failureBigToast(title, messsage) {
    Swal({
      type: 'error',
      title: title,
      text: messsage,
      showConfirmButton: true,
    });
  }


  // DateTime:
  getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return (yyyy + '/' + mm + '/' + dd);
  }
  getCurrentDateForm() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return (yyyy + '-' + mm + '-' + dd);
  }
  getCurrentTime() {
    const today = new Date();
    const hh = String(today.getHours()).padStart(2, '0');
    const mm = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');

    return (hh + ':' + mm + ':' + ss);
  }
  getReportFormatedDate(date) {
    const today = new Date(date);
    const dd = String(today.getDate());
    const mm = String(today.getMonth() + 1);
    const yyyy = today.getFullYear();

    return (mm + '/' + dd + '/' + yyyy);
  }
  getReportFormatedDateYMD(date) {
    const today = new Date(date);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return (yyyy + '-' + mm + '-' + dd);
  }

  // Encryption:
  encryptData(data) {
    return CryptoJS.AES.encrypt(data.toString(), EncryptionPassword).toString();
  }
  decryptData(data) {
    return CryptoJS.AES.decrypt(data, EncryptionPassword).toString(CryptoJS.enc.Utf8);
  }
}
