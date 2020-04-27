import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import {NavController} from "ionic-angular";
import {CartdetailPage} from "../cartdetail/cartdetail";
// import { HttpErrorResponse } from '@angular/common/http';
export interface homesub{
    title: string;
    component: any;
  }
  export interface homeCategory{
    title: string;
  }
  export interface homeItemBase{
    title: string;
    component: any;
  }
@Component({
  selector: 'home_living',
  templateUrl: 'home_living.html'
})

export class Home_livingCategoryPage {
    shownGroup = null;
    sublevel='yes';
    homeCategoryMenuItems: Array<homeCategory>;
    homesubItems: Array<homesub>;
    homeCategoryBaseMenuItems:Array<homeItemBase>;
  constructor(
    public navCtrl: NavController
    ) {
        this.homeCategoryMenuItems=[
            {title:'Home Appliances' }
          ]
          this.homesubItems=[
            {title: 'Shirt', component: HomePage},
            {title: 'T-Shirt', component: HomePage}
          
          ]
          this.homeCategoryBaseMenuItems=[
            {title:'Home Decor',component:HomePage },
            {title:'Home Furnishing',component:HomePage }
          ]
  }

  ionViewWillEnter() {

    
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
    this.navCtrl.push(page.component);
  }
  gotoCategory(){
    this.navCtrl.push(CartdetailPage);
  }
}
