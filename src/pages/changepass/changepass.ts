import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {UtilProvider} from "../../providers/util/util";
import {MyAccountPage} from "../myaccount/myaccount";
import {UserauthProvider} from "../../providers/userauth/userauth";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  password:any='';
  rePassword:any='';
  user_id:any='';

  constructor(public navCtrl: NavController,public userAuth: UserauthProvider,public viewCtrl:ViewController,
              public navParams: NavParams,public http: HttpClient,private storage: Storage,
  public util: UtilProvider) {
    this.storage.get("user_id").then(value => {
      console.log("Login user id", value);
      this.user_id = value;
      if (this.user_id == null) {
        this.navCtrl.setRoot(MyAccountPage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }

  changePassword(){
    console.log('pass ====',this.password, ' repass=====', this.rePassword);
    if (this.password.toString().trim() == ''){
      this.util.presentToast('Please enter the Password');
      return;
    }
    if (this.rePassword.toString().trim() == ''){
      this.util.presentToast('Please re-enter the Password');
      return;
    }
    /*if (!this.password.toString().equals(this.rePassword.toString())){
      this.util.presentToast('Password and Re-Password are not matched');
      return;
    }*/
    this.callChangePassApi()
  }

  private callChangePassApi() {
    this.util.presentLoading();
    let data = {
      id:this.user_id,
      pass:this.password,
      repass:this.rePassword
    };
    this.http
        .post(this.userAuth.apiIneerPage + "changePassword", data)
        .subscribe(
            result => {
              this.util.dismissLoading();
              console.log('success response ----',result)
              if (result['status']=='false'){
                this.util.presentToast(result['message']);
              }else{
                this.util.presentToast(result['message']);
                this.viewCtrl.dismiss();
              }
            },
            err => {
              console.error(err);
              this.util.dismissLoading();
            }
        );
  }
}
