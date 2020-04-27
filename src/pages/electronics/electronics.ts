import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import {NavController} from "ionic-angular";
import {CartdetailPage} from "../cartdetail/cartdetail";
// import { HttpErrorResponse } from '@angular/common/http';
export interface electricsub{
    title: string;
    component: any;
  }
  export interface electricCategory{
    title: string;
    icon: string;
  }
  export interface electricItemBase{
    title: string;
    component: any;
  }
@Component({
  selector: 'electronics',
  templateUrl: 'electronics.html'
})

export class ElectronicCategoryPage {
    shownGroup = null;
    sublevel='yes';
    electricCategoryMenuItems: Array<electricCategory>;
    electricsubItems: Array<electricsub>;
    electricCategoryBaseMenuItems:Array<electricItemBase>;
  constructor(
    public navCtrl: NavController
    ) {
        this.electricCategoryMenuItems=[
            {title:'Laptops',icon:'shirt' }
          ]
          this.electricsubItems=[
            {title: 'Shirt', component: HomePage},
            {title: 'T-Shirt', component: HomePage}
          
          ]
          this.electricCategoryBaseMenuItems=[
            {title:'Mobile',component:HomePage },
            {title:'Mobile Accessories',component:HomePage },
            {title:'Tablet',component:HomePage },
            {title:'Television',component:HomePage },
            {title:'Speakers',component:HomePage  },
            {title:'Smart Watches',component:HomePage  },
            {title:'Desktop PCs' ,component:HomePage },
            {title:'Computer Accessories' ,component:HomePage }
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
