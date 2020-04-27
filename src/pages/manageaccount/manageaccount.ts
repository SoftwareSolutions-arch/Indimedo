import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from "../../providers/util/util";
/**
 * Generated class for the ManageaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manageaccount',
  templateUrl: 'manageaccount.html',
})
export class ManageaccountPage {
  billingUserData = {
    bfirstName:'',
    blastName:'',
    bemail:'',
    bphone:'',
    password:'',
    repassword:''
  }
  userlogin:Boolean=true;
  userpassword:Boolean=true;
  useraddress:Boolean=true;
  userdetails:Boolean=true;
  constructor(public util: UtilProvider,private http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageaccountPage');
  }


  editprofile() {
    this.userlogin=true;
    this.userpassword=false;
    this.useraddress=false;
    this.userdetails=false;
    // this.http.post('https://www.indimedo.com/api/updateProfile', this.billingUserData).subscribe(result => {
    //       this.util.presentToast(result['message']);
    //       this.util.dismissLoading();
    // },
    // );
  }

  changepassword(){
  this.userlogin=false;
  this.userpassword=true;
  this.useraddress=false;
  this.userdetails=false;
  }

  editaddress(){
    this.userlogin=false;
    this.userpassword=false;
    this.useraddress=true;
    this.userdetails=false;
    
  }

  myaccount(){
    this.userlogin=false;
    this.userpassword=false;
    this.useraddress=true;
    this.userdetails=true;
  }

  // editprofile(){

  // }
}
