import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { HomePage } from "../home/home";
import swal from "sweetalert";
import { OrderdetailPage } from "../orderdetail/orderdetail";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { UserauthProvider } from "../../providers/userauth/userauth";
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";
import { MyAccountPage } from "../myaccount/myaccount";

@Component({
  selector: "cartdetail",
  templateUrl: "cartdetail.html"
})
export class CartdetailPage {
  user_id: number;

  qty: any;
  userPasswordData = { password: "", email: "" };
  uid = "1";
  udid = "a2g6";
  ALlOrder = [];

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public http: HttpClient,
    public userAuth: UserauthProvider,
    public util: UtilProvider
  ) {
    this.getCartItems();
    this.getcartcount();
    this.getCartAmount();
    this.qty = 1;
  }

  ionViewWillEnter() {
    // this.getcartcount();
  }
  // increment product qty
  incrementQty() {
    console.log(this.qty + 1);
    this.qty += 1;
  }

  // decrement product qty
  decrementQty() {
    if (this.qty - 1 < 1) {
      this.qty = 1;
      console.log("->" + this.qty);
    } else {
      this.qty -= 1;
      console.log("2->" + this.qty);
    }
  }

  removecart() {}

  // removecart() {
  //   this.storage.get("user_id").then(value => {
  //     this.user_id = value;
  //     var loginData = {
  //       id: this.user_id
  //     };
  //     swal({
  //       title: "Are you sure?",
  //       text: "You want to remove item!",
  //       buttons: ["Yes", "No"]
  //     }).then(result => {
  //       if (result) {
  //         swal("Your cart is safe");
  //       } else {
  //         this.http
  //           .post(`https://www.indimedo.com/removeCartItem`, loginData)
  //           .subscribe((res: any) => {});
  //       }
  //     });
  //     this.navCtrl.setRoot(HomePage);
  //   });
  // }

  checkout() {
    this.navCtrl.push(OrderdetailPage);
  }

  getCartItems() {

    const loginData = new FormData();
    loginData.append("udid", this.udid);
    loginData.append("uid", this.uid);
    loginData.append("password", this.userPasswordData.password);
    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http
        .post(this.userAuth.apiIneerPage + "getCartItems", loginData)
        .subscribe(
          result => {
            console.log("result getCartItems", result);
            this.util.dismissLoading();
            if (result["status"] == "true") {
              //Display sucess Toast
              this.ALlOrder = result["products"];
              this.util.presentToast(result["message"]);
            } else {
              this.util.presentToast(result["message"]);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getcartcount() {
    const loginData = new FormData();
    loginData.append("udid", this.udid);
    loginData.append("uid", this.uid);
    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http.post(this.userAuth.apiIneerPage + "getCartCount", loginData).subscribe(
        result => {
          console.log(" result getcartcount ", result);
          // this.util.dismissLoading();
            if (result["status"] == "true") {
              //Display sucess Toast
              this.util.presentToast(result["message"]);
              //Redirect to dashboard

              // this.navCtrl.setRoot(MyAccountPage);
            } else {
              this.util.presentToast(result["message"]);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getCartAmount() {
    const loginData = new FormData();
    loginData.append("udid", this.udid);
    loginData.append("uid", this.uid);
    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http.post(this.userAuth.apiIneerPage + "getCartAmount", loginData).subscribe(
        result => {
          console.log(" result getCartAmount ", result);
          // this.util.dismissLoading();
            if (result["status"] == "true") {
              //Display sucess Toast
              this.util.presentToast(result["message"]);
              //Redirect to dashboard

              // this.navCtrl.setRoot(MyAccountPage);
            } else {
              this.util.presentToast(result["message"]);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }

  clearCart() {
    const loginData = new FormData();
    loginData.append("udid", this.udid);
    loginData.append("uid", this.uid);
    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http.post(this.userAuth.apiIneerPage + "clearCart", loginData).subscribe(
        result => {
          console.log(" result clearCart ", result);
          // this.util.dismissLoading();
            if (result["status"] == "true") {
              //Display sucess Toast
              this.util.presentToast(result["message"]);
              //Redirect to dashboard

              // this.navCtrl.setRoot(MyAccountPage);
            } else {
              this.util.presentToast(result["message"]);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
