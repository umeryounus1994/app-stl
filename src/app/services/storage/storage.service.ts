import { Injectable } from '@angular/core';
import { SessionStorage } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  @SessionStorage({ key: 'THEAWEBAuthentications347' }) userDetails: object = undefined;

  constructor() { }

  saveUserDetails(data) {
    this.userDetails = data;
  }

  removeUserDetails() {
    this.userDetails = undefined;
  }
}
