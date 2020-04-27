import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';

/**
 * Generated class for the ErrorCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-error-check',
  templateUrl: 'error-check.html',
})
export class ErrorCheckPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public util: UtilProvider,public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorCheckPage');
  }
  errorHandle(){
    this.util.presentToast('Something Went Wrong');
     this.platform.exitApp();
  }
}
