import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginPage } from "../login/login";
import { CartdetailPage } from "../cartdetail/cartdetail";
import { UtilProvider } from "../../providers/util/util";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the ForgetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-forgetpassword",
  templateUrl: "forgetpassword.html"
})
export class ForgetpasswordPage {
  userData = { email: "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public util: UtilProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgetpasswordPage");
  }
  save() {
    this.navCtrl.push(LoginPage);
  }
  gotoCart() {
    this.navCtrl.push(CartdetailPage);
  }

  signup() {
    const regiData = new FormData();

    regiData.append("email", this.userData.email);

    // loginData.append("action", "login");
    // loginData.append("udid", this.device.uuid);
    // console.log(this.device.uuid, "loginData");

    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http
        .post("https://www.indimedo.com/userRegister", regiData)
        .subscribe(
          result => {
            console.log("Hello Userz", result);
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

              this.util.presentToast(result["message"]);
              this.navCtrl.setRoot(LoginPage);
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
