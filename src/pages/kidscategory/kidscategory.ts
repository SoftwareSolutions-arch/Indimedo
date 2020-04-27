import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import {NavController} from "ionic-angular";
import {CartdetailPage} from "../cartdetail/cartdetail";
// import { HttpErrorResponse } from '@angular/common/http';
export interface kidsub{
    title: string;
    component: any;
  }
  export interface kidCategory{
    title: string;
  }
  export interface kidItemBase{
    title: string;
    component: any;
  }
@Component({
  selector: 'kidscategory',
  templateUrl: 'kidscategory.html'
})

export class KidsCategoryPage {
    shownGroup = null;
    sublevel='yes';
    kidCategoryMenuItems: Array<kidCategory>;
    kidsubItems: Array<kidsub>;
    kidCategoryBaseMenuItems:Array<kidItemBase>;
  constructor(
    public navCtrl: NavController
    ) {
        this.kidCategoryMenuItems=[
            {title:'Boys Clothing'}
          ]
          this.kidsubItems=[
            {title: 'Shirt', component: HomePage},
            {title: 'T-Shirt', component: HomePage}
          
          ]
          this.kidCategoryBaseMenuItems=[
            {title:'Girls Clothing',component:HomePage },
            {title:'Boys Footwear',component:HomePage },
            {title:'Girls Footwear',component:HomePage },
            {title:'Kids Accessories',component:HomePage },
            {title:'Toys',component:HomePage  }
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
