import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactPage } from "../contact/contact";
import { AboutusPage } from "../aboutus/aboutus";

import { NewsPage } from "../news/news";
import { TermsAndConditionPage } from "../terms-and-condition/terms-and-condition";
import { PrivacyPolicyPage } from "../privacy-policy/privacy-policy";
import {ContactUsPage} from "../contact-us/contact-us";
import {RefundPage} from "../refund/refund";
import {DeliveryandshippingPage} from "../deliveryandshipping/deliveryandshipping";
import {BrowseAZPage} from "../browse-a-z/browse-a-z";
import {AllmedicationbrandsPage} from "../allmedicationbrands/allmedicationbrands";

@IonicPage()
@Component({
  selector: 'page-footer',
  templateUrl: 'footer.html',
})
export class FooterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FooterPage');
  }

  Contactus() {
    
    this.navCtrl.push(ContactPage);
  }

  Aboutus(){
    this.navCtrl.push(AboutusPage);
  }

  News(){
    this.navCtrl.push(NewsPage);
  }

  termandcondition(){
    this.navCtrl.push(TermsAndConditionPage);
  }
  privacypolicy(){
    this.navCtrl.push(PrivacyPolicyPage);
  }

  writetous(){
    this.navCtrl.push(ContactUsPage);
  }
  refund(){
    this.navCtrl.push(DeliveryandshippingPage);
  }
  deliveryandshipping(){
    this.navCtrl.push(DeliveryandshippingPage);
  }

  browseaz(){
    this.navCtrl.push(BrowseAZPage);
  }

  Manufacturers(){
    this.navCtrl.push(AllmedicationbrandsPage);

  }
}
