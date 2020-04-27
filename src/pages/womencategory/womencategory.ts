import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {CartdetailPage} from "../cartdetail/cartdetail";
import { UtilProvider } from "../../providers/util/util";
import { UserauthProvider } from "../../providers/userauth/userauth";
import {Storage} from '@ionic/storage';
@Component({
  selector: 'womencategory',
  templateUrl: 'womencategory.html'
})

export class WomenCategoryPage {
    AllCategoryPage=[];
    womenscategory=[];
      showLevel1 = null;
      showLevel2 = null;
    womenCategoryMenuItems:any;

  constructor(
    public navCtrl: NavController,
    public util: UtilProvider,
    public userAuth: UserauthProvider,
    private storage: Storage
    ) {
      this.getData();
  }

  ionViewWillEnter() {

    
  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }
  gotoCategory(){
    this.navCtrl.push(CartdetailPage);
  }
  getData(){
    this.util.presentLoading();
    this.userAuth.getListData().then((result) => {
      console.log(result);
      this.AllCategoryPage.push(result); // 2
      this.storage.set('womenscategory', this.AllCategoryPage); // 4
      this.womenscategory = this.AllCategoryPage[0].categories["data"];
      this.womenCategoryMenuItems = this.womenscategory[1].children_data;
      this.util.dismissLoading(); 
      
    }).catch((error: any) => {
      if (error.data == undefined) {
        this.util.presentAlertData();
      }
      else {
        this.util.presentAlert();
      }
     
      
    })
  }
  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };
  
  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };
  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };
  
  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };
}
