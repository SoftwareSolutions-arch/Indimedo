import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MyaddressdetailPage } from "../myaddressdetail/myaddressdetail";
import { PaymentdetailPage } from "../paymentdetail/paymentdetail";


@IonicPage()
@Component({
  selector: "page-orderdetail",
  templateUrl: "orderdetail.html"
})
export class OrderdetailPage {
  qty;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderdetailPage");
  }
  addDetail() {
    this.navCtrl.push(MyaddressdetailPage);
  }
  checkout() {
    this.navCtrl.push(PaymentdetailPage);
  }

  removecart(){

  }

  incrementQty(){}

  decrementQty(){}


}
