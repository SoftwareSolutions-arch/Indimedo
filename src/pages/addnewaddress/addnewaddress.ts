import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { HomePage } from "../home/home";
import { Storage } from "@ionic/storage";
import { CartdetailPage } from "../cartdetail/cartdetail";

@Component({
  selector: "addnewaddress",
  templateUrl: "addnewaddress.html"
})
export class AddNewAddressPage {
  userPasswordData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
    phone: ""
    // postalcode:"",
    // postalcode:"",
    // postalcode:"",
    // postalcode:"",
  };

  billing_shipping_same: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {}
  placeOrder() {
    this.alertCtrl
      .create({
        title: "Order Placed Successfully",
        message:
          "Your order has been placed successfully. Your order number is ",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }
        ]
      })
      .present();
  }
  openCart() {
    this.navCtrl.push(CartdetailPage);
  }
}
