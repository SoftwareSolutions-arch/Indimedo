import { Component } from '@angular/core';
import { HomePage } from "../home/home";
import {NavController} from "ionic-angular";
import {CartdetailPage} from "../cartdetail/cartdetail";
// import { HttpErrorResponse } from '@angular/common/http';
export interface beautysub{
    title: string;
    component: any;
  }
  export interface beautyCategory{
    title: string;
  }
  export interface beautyItemBase{
    title: string;
    component: any;
  }
@Component({
  selector: 'beautycare',
  templateUrl: 'beautycare.html'
})

export class beautyCategoryPage {
    shownGroup = null;
    sublevel='yes';
    beautyCategoryMenuItems: Array<beautyCategory>;
    beautysubItems: Array<beautysub>;
    beautyCategoryBaseMenuItems:Array<beautyItemBase>;
  constructor(
    public navCtrl: NavController
    ) {
        this.beautyCategoryMenuItems=[
            {title:'MakeUp' }
          ]
          this.beautysubItems=[
            {title: 'Shirt', component: HomePage},
            {title: 'T-Shirt', component: HomePage}
          
          ]
          this.beautyCategoryBaseMenuItems=[
            {title:'Skin Care & Body Care',component:HomePage },
            {title:'Hair Care',component:HomePage }
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
