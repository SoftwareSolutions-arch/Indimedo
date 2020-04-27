import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { MyAccountPage } from '../pages/myaccount/myaccount';
import { CartdetailPage } from '../pages/cartdetail/cartdetail';
import { ProductCategoryPage } from '../pages/ProductCategory/ProductCategory';
import { WomenCategoryPage } from '../pages/womencategory/womencategory';
import { beautyCategoryPage } from '../pages/beautycare/beautycare';
import { KidsCategoryPage } from '../pages/kidscategory/kidscategory';
import { ElectronicCategoryPage } from '../pages/electronics/electronics';
import { Home_livingCategoryPage } from '../pages/home_living/home_living';
import { OrderlistPage } from '../pages/orderlist/orderlist';
import { Network } from '@ionic-native/network';
import { NetworkproviderProvider } from '../providers/networkprovider/networkprovider';
import {UtilProvider} from '../providers/util/util';
import { L } from '@angular/core/src/render3';
import { MycartPage } from '../pages/mycart/mycart';
import { ManageaccountPage } from '../pages/manageaccount/manageaccount';

export interface MenuItem {
  title: string;
  component: any;

}
export interface SubMenu{
title: string;
component: any;
icon: string;
}
export interface Menu{
title: string;
icon: string;
}
@Component({
templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  shownGroup = null;
  sublevel='yes';
  appMenuItems: Array<MenuItem>;
  pageCategoryMenuItems: Array<Menu>;
  submenuItems:Array<SubMenu>;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public events: Events,
    public network: Network,
    public networkProvider: NetworkproviderProvider,
    public util:UtilProvider
    // public splashScreen: SplashScreen,
    // public keyboard: Keyboard
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage},
      //{title: 'Category', component: ProductCategoryPage},
      {title:'Diabetic Care',component: ProductCategoryPage},
      {title: 'Shop By Concern', component: WomenCategoryPage},
      {title: 'Diet Nutrition', component: beautyCategoryPage},
      {title: 'Medical Devices', component: KidsCategoryPage},
      {title: 'Homeopathy', component: ElectronicCategoryPage},
      {title: 'Sexual Wellness', component: Home_livingCategoryPage},
      {title: 'Personal Care', component: HomePage},
      {title: 'Medicine', component: LoginPage},
      {title: 'My Account', component: MyAccountPage},
      {title: 'My Cart', component: MycartPage},
      {title: 'My Orders', component: OrderlistPage},
      // {title: 'Manage Account', component: ManageaccountPage}
    ];
    // this.pageCategoryMenuItems=[
    //   {title:'Categories',icon:'list-box' }
    // ]
    // this.submenuItems=[
    //   {title: 'Mens Fashion', component: MensCategoryPage, icon: 'shirt'},
    //   {title: 'Womens Fashion', component: WomenCategoryPage, icon: 'woman'},
    //   {title: 'Beauty & Personal Care', component: beautyCategoryPage, icon: 'brush'},
    //   {title: 'Kids', component: KidsCategoryPage, icon: 'body'},
    //   {title: 'Electronics', component: ElectronicCategoryPage, icon: 'laptop'},
    //   {title: 'Home & Living', component: Home_livingCategoryPage, icon: 'home'},
    //   {title: 'Grocery', component: HomePage, icon: 'beer'}

    // ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
// debugger
      //*** Control Keyboard
      //this.keyboard.disableScroll(true);
      this.networkProvider.initializeNetworkEvents();

      // Offline event
      this.events.subscribe('network:offline', () => {
         // alert('network:offline ==> '+this.network.type);
          this.util.presentNetwork();
      });

      // Online event
      this.events.subscribe('network:online', () => {
          //alert('network:online ==> '+this.network.type);
          this.util.presentCustomToast('Network Connected');
      });
    });
  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  }
  isGroupShown(group) {
      return this.shownGroup === group;
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // debugger
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }
  myaccount(){
    this.nav.setRoot(MyAccountPage);
  }
}
