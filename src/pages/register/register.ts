import { Component, ɵConsole } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { UserauthProvider } from "../../providers/userauth/userauth";
import { UtilProvider } from "../../providers/util/util";
import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: "register",
  templateUrl: "register.html"
})
export class RegisterPage {
  signupform: FormGroup;
  userData = { email: "", name: "", phone_no: "" };
  // http: any;

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public util: UtilProvider,
    public userAuth: UserauthProvider,
    public storage: Storage
  ) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*"),
        Validators.minLength(4),
        Validators.maxLength(30)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(EMAILPATTERN)
      ]),
      phone_no: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]{10}"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegistrationPage");
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  signup() {

    console.log("signup1")
    const regiData = new FormData();
    regiData.append("fname", this.userData.name);
    regiData.append("email", this.userData.email);
    regiData.append("number", this.userData.phone_no);

    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http
        .post("https://www.indimedo.com/api/userRegister", regiData)
        .subscribe(
          result => {
            console.log("signup2",result)
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

              this.navCtrl.setRoot(LoginPage);
            } else {
              this.util.presentToast("Mobile number or email already exist");
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
