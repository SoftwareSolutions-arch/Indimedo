import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  Platform
} from "ionic-angular";
import { UserauthProvider } from "../../providers/userauth/userauth";
import { UtilProvider } from "../../providers/util/util";
import { HomePage } from "../../pages/home/home";
import { Storage } from "@ionic/storage";
import { RegisterPage } from "../register/register";
import { ForgetpasswordPage } from "../forgetpassword/forgetpassword";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Device } from "@ionic-native/device";
import { MyAccountPage } from "../myaccount/myaccount";
import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
// import {UserauthProvider} from '../../providers/userauth/userauth'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginPasswordform: FormGroup;
  loginOtpForm: FormGroup;
  userPasswordData = { password: "", email: "" };
  userOtpData = { phone_no: "", otp: "" };
  user_id: number;

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userAuth: UserauthProvider,
    public util: UtilProvider,
    public menu: MenuController,
    private storage: Storage,
    private device: Device,
    public platform: Platform,
    public location: Location
  ) {
    this.storage.get("user_id").then(value => {
      console.log("Login user id", value);
      this.user_id = value;
      if (this.user_id != null) {
        this.navCtrl.setRoot(MyAccountPage);
      }
    });
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginPasswordform = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(EMAILPATTERN)
      ])
    });
    this.loginOtpForm = new FormGroup({
      otp: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
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
    console.log("ionViewDidLoad LoginPage");
    this.menu.enable(false);
  }

  loginpassword() {
    console.log("Loginapss1");
    const loginData = new FormData();
    loginData.append("u_email", this.userPasswordData.email);
    loginData.append("u_password", this.userPasswordData.password);
    // loginData.append("action", "login");
    // loginData.append("udid", this.device.uuid);
    // console.log(this.device.uuid, "loginData");

    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http.post(this.userAuth.apiIneerPage + "userLogin", loginData)
        .subscribe(
          result => {
            console.log(result,"Loginapss2")
            this.util.dismissLoading();
            if (result["status"] == "true") {
              //Display sucess Toast
              this.util.presentToast(result["message"]);
              //Add values in storage
              this.storage.set("isLogin", true);
              this.storage.set("user_id", result["id"]);
              // this.storage.set("device_id", this.device.uuid);
              // this.storage.store(this.storage.KEY_LOGIN_ID, result['id']);
              // this.storage.store(this.storage.KEY_LOGIN_TYPE, result['type']);

              //Redirect to dashboard

              this.navCtrl.setRoot(MyAccountPage);
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

  loginOtp() {

    console.log("Hello 1")
    const loginData = new FormData();
    loginData.append("u_email", this.userOtpData.phone_no);
    loginData.append("u_password", this.userOtpData.otp);
    // loginData.append("action", "login");
    // loginData.append("udid", this.device.uuid);
    // console.log(this.device.uuid, "loginData");

    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      // this.apiUrl + "homepage"
      // https://www.indimedo.com/userLogin
      this.http
        .post(this.userAuth.apiIneerPage + "userLogin", loginData)
        .subscribe(
          result => {
            console.log("Hello 2",result)

            this.util.dismissLoading();
            if (result["status"] == "true") {
              //Display sucess Toast
              this.util.presentToast(result["message"]);
              //Add values in storage
              this.storage.set("userInfo", JSON.stringify(result));
              this.storage.set("isLogin", true);
              this.storage.set("user_id", result["id"]);
              this.storage.set("fname", result["fname"]);
              this.storage.set("mobile", result["mobile"]);

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

  sendOTP(){
    this.util.presentLoading();
    this.http
        .post(this.userAuth.apiIneerPage + "loginWithOtp", { "number": this.userOtpData.phone_no})
        .subscribe(
            result => {
              console.log("mydata**************************************",result)
              this.util.dismissLoading();
              console.log("Hello 2",result)
              let data = {
                status:'success',
                otp:'12346',
                data:{
                  userid:'124',
                  username:'Name',
                  email:'abc@gmail.com'
                }
              }
            },
            err => {
              this.util.dismissLoading();
            }
        );
  }

  regi() {
    this.navCtrl.setRoot(RegisterPage);
  }
  forgotPass() {
    this.navCtrl.push(ForgetpasswordPage);
  }
  openPassword() {
    //this.active.classList.remove("active");
    document.getElementById("btnotp").style.backgroundColor = "#ff7300";
    document.getElementById("btnpassword").style.backgroundColor = "#00b6c1";
    document.getElementById("passworddiv").style.display = "block";
    document.getElementById("otpdiv").style.display = "none";
  }
  openOtp() {
    document.getElementById("btnpassword").style.backgroundColor = "#ff7300";
    document.getElementById("btnotp").style.backgroundColor = "#00b6c1";
    document.getElementById("otpdiv").style.display = "block";
    document.getElementById("passworddiv").style.display = "none";
  }

  back() {
    this.navCtrl.setRoot(HomePage);
  }
}
