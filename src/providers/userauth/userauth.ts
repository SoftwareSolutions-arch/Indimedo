import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestOptions, Headers } from "@angular/http";

@Injectable()
export class UserauthProvider {
  apiUrl = "https://www.indimedo.com/api/";
  apiIneerPage = "https://www.indimedo.com/api/";
  ImageUrl = "http://showmeproject.com/indimedo/products-images/";
  catid: any;
  id: any;
  searchkey: any;
  options: any;
  sort: any;
  brand: any;
  max: any;
  min: any;
  filter: any;
  offset: any;
  constructor(public http: HttpClient) {
    console.log("Hello UserauthProvider Provider");
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");

    this.options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });
  }
  // new login user added
  User(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiIneerPage + "userLogin", data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  // new register user added
  regiUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiIneerPage + "userRegister", data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  // new insertdata added
  insertData(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "add_data.php", data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  // new getListdata added
  getListData() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "homepage").subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  // new editdata added
  editData(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "edit_data.php", data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
  // new productdata added
  getProductData() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl + "productlisting.php", {
          params: {
            catid: this.catid
          }
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  // new productdetails added
  getProductDetail() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl + "productDetails.php", {
          params: {
            id: this.catid
          }
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  //Searching
  getSearchData() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "searchProductFilter.php").subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  //Filter
  getSearchFilterData() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl + "searchProductFilter.php", {
          params: {
            key: this.searchkey
          }
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  //Sorting
  getSortProductData() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl + "productlisting.php", {
          params: {
            catid: this.catid,
            sort: this.sort
          }
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  openCart() {
    this.http.get("https://www.indimedo.com/api/viewAllOrder/72").subscribe(response => {
      console.log("&&&&&&&&&&&",response);
    });
  }
}
