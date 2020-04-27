import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home";
import {NavController} from "ionic-angular";
import swal from 'sweetalert';
import { OrderdetailPage } from '../orderdetail/orderdetail';
import { CartdetailPage } from '../cartdetail/cartdetail';
import { MyaddressdetailPage } from '../myaddressdetail/myaddressdetail';
import { ProfileditPage } from '../profiledit/profiledit';
import { LoginPage } from '../login/login';
// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'myaccount',
  templateUrl: 'myaccount.html'
})
export class MyAccountPage {
  weather: any;
  user_id: number;
  myid:any;
  fname:any;
  mobile:any;
  userInfo:any={}
  public reorder = { name: "My Orders" }
  public locate = { name: "My Addresses" }
  public cog = { name: "Account Settings" }
  public changePassword = { name: "Change Password" }

  constructor(
    public navCtrl: NavController,
    private storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.get('user_id').then(id =>{
      this.myid=id;
    });
    this.storage.get('fname').then(fname =>{
      this.fname = fname;
      console.log(this.fname,"this.fname")
    });

    this.storage.get('mobile').then(mobile =>{
      this.mobile = mobile;
    });

    this.storage.get('order').then((val) => {
      if (val === null) {
        this.reorder.name = "My Orders";
        this.locate.name="My Addresses";
        this.cog.name="Account Settings";
      } else {
        this.reorder.name = val;
        this.locate.name = val;
        this.cog.name= val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // to go account page
  goToChangePassword() {
    this.navCtrl.push('ChangepassPage');
  }
  goToAccount() {
    this.navCtrl.push(ProfileditPage);
  }
  goToAddress(){
    this.navCtrl.push(MyaddressdetailPage);
  }
  goToOrder(){
    this.navCtrl.push(OrderdetailPage);
  }
  gotoCart(){
    this.navCtrl.push(CartdetailPage);
  }
  logout() {
    swal({
      title: 'Are you sure?',
      text: 'You want to Logout!',
      buttons: ["Yes", "No"],
    }).then((result) => {
      if (result) {
        swal( 'Your login is safe');
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else  {
        swal('You succesfully Logout.');
        this.storage.set("user_id",null);
        this.navCtrl.setRoot(HomePage);
      }
    })
  }
  addaddress(){
    this.navCtrl.push(ProfileditPage);
  }
  back() {
    this.navCtrl.setRoot(HomePage); 
    
}
}
