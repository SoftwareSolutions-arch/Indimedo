import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CartdetailPage } from "../cartdetail/cartdetail";
import { AddNewAddressPage } from "../addnewaddress/addnewaddress";
import { UtilProvider } from "../../providers/util/util";
import { HttpClient } from "@angular/common/http";
import { UserauthProvider } from "../../providers/userauth/userauth";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the MyaddressdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-myaddressdetail",
  templateUrl: "myaddressdetail.html"
})
export class MyaddressdetailPage {
  public userid: "72";
  lname: any;
  ALlOrder: any;
  data: any;
  user_id: number;


  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams,
    public http: HttpClient,
    public util: UtilProvider,
    public userAuth: UserauthProvider
  ) {
    this.getAddress();
  }

  ionViewDidLoad() {
    // this.getAddress();
    // console.log("ionViewDidLoad MyaddressdetailPage");
  }
  gotoCart() {
    this.navCtrl.push(CartdetailPage);
  }
  addDetail() {
    this.navCtrl.push(AddNewAddressPage);
  }

  removecart() {}

  addadress() {}

  removeaddress() {}

  getAddress() {
    this.storage.get("user_id").then(value => {
      this.user_id = value;
      var loginData = {
        id: this.user_id
      };

      this.util.presentLoading();
      return new Promise((resolve, reject) => {
        console.log(loginData, "loginData@@@");

        this.http
          .post(this.userAuth.apiIneerPage + "latestAdderss", loginData)
          .subscribe(
            result => {
              console.log("^^^^^^^^^^", result);
              this.util.dismissLoading();
              if (result["status"] == "true") {
                //Display sucess Toast
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
    });
  }
}
