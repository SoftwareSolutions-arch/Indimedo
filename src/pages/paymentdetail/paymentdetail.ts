import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the PaymentdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentdetail',
  templateUrl: 'paymentdetail.html',
})
export class PaymentdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentdetailPage');
  }
  placeOrder() {
    this.alertCtrl.create({
      title: "Order Placed Successfully",
      message: "Your order has been placed successfully. Your order number is ",
      buttons: [{
        text: "OK",
        handler: () => {
          this.navCtrl.setRoot(HomePage);
        }
      }]
    }).present();

  }
}
