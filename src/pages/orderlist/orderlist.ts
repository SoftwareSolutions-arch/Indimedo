import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { UserauthProvider } from "../../providers/userauth/userauth";

/**
 * Generated class for the OrderlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-orderlist",
  templateUrl: "orderlist.html"
})
export class OrderlistPage {
  AllProductsHomePage = [];
  topbanner = [];
  ALlOrder = [];
  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userAuth: UserauthProvider
  ) {}

  ionViewDidLoad() {
    this.openCart();
    console.log("ionViewDidLoad OrderlistPage");
  }

  openCart() {
    // this.userAuth.apiUrl + "userLogin";
    this.http
      .get(this.userAuth.apiUrl + "viewAllOrder/72")
      .subscribe(response => {
        this.ALlOrder = response["orders"];
      });
  }
}
