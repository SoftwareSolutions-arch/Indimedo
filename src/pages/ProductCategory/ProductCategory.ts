import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {CartdetailPage} from "../cartdetail/cartdetail";
import { LoadingController } from "ionic-angular";
import { UtilProvider } from "../../providers/util/util";
import { UserauthProvider } from "../../providers/userauth/userauth";
import {Storage} from '@ionic/storage';
import { ProductListingPage } from '../ProductListing/ProductListing';
export interface SubMen{
    title: string;
    component: any;
  }
  export interface MenCategory{
    title: string;
   
  }
  export interface MenuItemBase{
    title: string;
    component: any;
  }
@Component({
  selector: 'ProductCategory',
  templateUrl: 'ProductCategory.html'
})

export class ProductCategoryPage {
  loading: any;
  AllCategoryPage=[];
  menscategory=[];
    showLevel1 = null;
    showLevel2 = null;
    menCategoryMenuItems:any;
    catid:any;
   // submenItems: Array<SubMen>;
    menCategoryBaseMenuItems:Array<MenuItemBase>;
  constructor(
    public navCtrl: NavController,
    public load:LoadingController,
    public util: UtilProvider,
    public userAuth: UserauthProvider,
    private storage: Storage
    ) {
      this.getData();
        // this.menCategoryMenuItems=[
        //     {title:'Tops' }
            
        //   ]
        //   this.menCategoryBaseMenuItems=[
        //     {title:'Bottoms',component:HomePage },
        //     {title:'Footwear',component:HomePage },
        //     {title:'Sports Wear',component:HomePage },
        //     {title:'Sleep Wear & SwimSuits',component:HomePage },
        //     {title:'Indian Wear',component:HomePage  },
        //     {title:'Suits & Blazers',component:HomePage  },
        //     {title:'Watches',component:HomePage  },
        //     {title:'Sunglasses' ,component:HomePage }
        //   ]
        //   this.submenItems=[
        //     {title: 'Shirt', component: ShirtMensCategoryPage},
        //     {title: 'T-Shirt', component: HomePage}
          
        //   ]
  }

  ionViewWillEnter() {
   
    
  }
  
  openPage(item) {
    this.util.presentLoading();
    this.navCtrl.push(ProductListingPage, {
      catid: item
  });
    this.util.dismissLoading(); 
  }
  gotoCategory(){
    this.navCtrl.push(CartdetailPage);
  }
  getData(){
    this.util.presentLoading();
    this.userAuth.getListData().then((result) => {
      console.log(result);
      this.AllCategoryPage.push(result); // 2
      this.storage.set('menscategory', this.AllCategoryPage); // 4
      this.menscategory = this.AllCategoryPage[0].categories["data"];
      this.menCategoryMenuItems = this.menscategory[0].children_data;
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
