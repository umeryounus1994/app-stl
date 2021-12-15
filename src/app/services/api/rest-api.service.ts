import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HelperService } from '../helper/helper.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient, private helper: HelperService,
    private sanitizer: DomSanitizer) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  get(path) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiURL + '/' + path).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
        this.helper.failureBigToast('Failed!', 'Something went wrong. Try again later or contact administrator.');
      });
    });
  }

  post(path, data) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiURL + '/' + path, data).subscribe((response: any) => {
        resolve(response);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  postMultiLanguage(path, data) {
    console.log(data)
    const headers = { 'Content-Type': 'text/plain;charset=utf-8' };
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiURL + '/' + path, data, {headers}).subscribe((response: any) => {
        resolve(response);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  patch(path,unique, data) {
    return new Promise((resolve, reject) => {
      this.http.patch(environment.apiURL + '/' + path+unique, data).subscribe((response: any) => {
        resolve(response);
      }, (error: any) => {
        reject(error);
      });
    });
  }



  getReport(path) {

    return new Promise((resolve, reject) => {
      const options = { responseType: 'blob' as 'json' }
      this.http.get<Blob>(environment.apiURL + '/' + path, options).subscribe((file: any) => {

        // console.log('start download:', file);

            saveAs(file, name + 'Booking Report');

        resolve(true);

      }, (error: any) => {
        reject(error);
      });
    });
  }

}
