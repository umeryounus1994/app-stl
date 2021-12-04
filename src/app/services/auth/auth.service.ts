import { Injectable } from '@angular/core';
import { RestApiService } from '../api/rest-api.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  user = undefined;

  isAdmin = false;
  isCustomer = false;


  constructor(private api: RestApiService, private router: Router, private storage: StorageService) {
    // console.log('SavedUserDetails', this.storage.userDetails);
    if (this.storage.userDetails) {
      this.isLoggedIn = true;
      this.user = this.storage.userDetails;

      // Role Check:
      this.roleCheck();
    }
  }

  saveLocalTokens(id, role, email) {

    
    let data = {
      id: id,
      role: role,
      email:email,
    };

    console.log(data)
    localStorage.setItem("isnitched", JSON.stringify(data));
  }

  getLocalTokens() {
    return JSON.parse(localStorage.getItem("isnitched"));
  }

  clearLocalTokens() {
    return localStorage.removeItem("isnitched");
  }


  login(userDeatils) {
    return new Promise((resolve, reject) => {
      this.api.post('admin/loginAdmin', userDeatils).then((data: any) => {
        // console.log('UserData', data);

        if (!data.Locked) {

          // Creating Session:
          this.storage.saveUserDetails(data);
          this.isLoggedIn = true;
          this.user = data;
          this.saveLocalTokens(this.user._id, this.user.role, this.user.email)
          // Role Check:
          this.roleCheck();

          resolve('open');

        } else {
          resolve('locked');
        }


      }, () => {
        resolve(false);
      });
    });
  }

  logout() {
    // Reset:
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isCustomer = false;
    this.user = undefined;
    this.storage.removeUserDetails();

    // Redirect:
    this.router.navigate(['/auth/login']);
  }

  roleCheck() {
    if (this.user.role === 0) {
      this.isAdmin = true;
      this.isCustomer = false;
    } else {
      this.isAdmin = false;
      this.isCustomer = true;
    }
  }
}
