import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { UtilProvider } from "../../providers/util/util";
import { FormGroup } from "@angular/forms";
import { HomePage } from "../../pages/home/home";

/**
 * Generated class for the ProfileditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profiledit",
  templateUrl: "profiledit.html"
})
export class ProfileditPage {
  loginOtpForm: FormGroup;
  userPasswordData = { fname: "", email: "", lname: "", phone: "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public util: UtilProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfileditPage");
  }

  // editprofile(){}

  editprofile() {
    const loginData = new FormData();
    loginData.append("fname", this.userPasswordData.fname);
    loginData.append("lname", this.userPasswordData.lname);
    loginData.append("email", this.userPasswordData.email);
    loginData.append("phone", this.userPasswordData.phone);
    // loginData.append("action", "login");
    // loginData.append("udid", this.device.uuid);
    // console.log(this.device.uuid, "loginData");

    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http
        .post("https://www.indimedo.com/updateProfile", loginData)
        .subscribe(
          result => {
            this.util.dismissLoading();
            if (result["status"] == "true") {
              //Display sucess Toast
              this.util.presentToast(result["message"]);
              //Add values in storage
              // this.storage.set("isLogin", true);
              // this.storage.set("user_id", result["user"]["data"][0].userid);
              // this.storage.set("device_id", this.device.uuid);
              // this.storage.store(this.storage.KEY_LOGIN_ID, result['id']);
              // this.storage.store(this.storage.KEY_LOGIN_TYPE, result['type']);

              //Redirect to dashboard

              this.navCtrl.setRoot(HomePage);
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


  placeOrder() {
    const loginData = new FormData();
    loginData.append("fname", this.userPasswordData.fname);
    loginData.append("lname", this.userPasswordData.lname);
    loginData.append("email", this.userPasswordData.email);
    loginData.append("phone", this.userPasswordData.phone);

    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http
        .post("https://www.indimedo.com/updateProfile", loginData)
        .subscribe(
          result => {
            this.util.dismissLoading();
            if (result["status"] == "true") {
              //Display sucess Toast
              this.util.presentToast(result["message"]);
              this.navCtrl.setRoot(HomePage);
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

  gotoCart(){}
}
