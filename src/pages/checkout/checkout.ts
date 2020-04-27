import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from "../../providers/util/util";
import swal from "sweetalert2";
import { OrderlistPage } from '../orderlist/orderlist';
import { Nav, Platform, Events } from 'ionic-angular';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  @ViewChild(Nav) nav: Nav;
  differentaddress:boolean=false;
  getallcartItems:any = [];
  getcountryItems:any = [];
  stateList : any = [];
  cityList : any = [];
  uid = "1";
  udid = "a2g6";
  cartamount: any;
  cashondeliveryvalue: any;
  billingUserData = {
    bfirstName:'',
    blastName:'',
    bcompany:'',
    bemail:'',
    bphone:'',
    baddress1:'',
    baddress2:'',
    bcountry:1,
    bstate:1,
    bcity: 1,
    bzip:1,
    bOrederid: Math.floor(10000000000 + Math.random() * 90000000000)
  }
  shippingUserData = {
    sFirstName:'',
    sLastName:'',
    sCompany:'',
    sEmail:'',
    sPhone:'',
    sAddress1:'',
    sAddress2:'',
    sCcountry:1,
    sState:1,
    sCity:1,
    sZip:1,
    sOrdersid:'INDIMEDO01252',
  }

  constructor(public util: UtilProvider,public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,) {
  }

  ionViewDidLoad() {
  }

  checkbox(event){
    let data=event.target.checked;
    if(data==true){
      this.differentaddress=true;
    }else{
      this.differentaddress=false;
    }
  }

  ionViewWillEnter(){
    this.getCartItem();
    this.getCartAmount();
  }
  getCountryList() {
    this.http.get('https://www.indimedo.com/api/get-country-list').subscribe(result => {
      this.getcountryItems = result;
    },
    );
  }

  selectCountry(id){
    let selectedCountry = document.getElementById(id);
    let val = selectedCountry['options'][selectedCountry['selectedIndex']].text;
    let selectedCountryId = 1;
    this.getcountryItems.filter(item => {
      if(val == item.name){
        selectedCountryId = item.id;
      }
    })
    if(id == 'country'){
      this.billingUserData.bcountry = selectedCountryId
    }else {
      this.shippingUserData.sCcountry = selectedCountryId
    }
    this.getstatelist(selectedCountryId);
  }

  selectState(id){
    let selectedState = document.getElementById(id);
    let val = selectedState['options'][selectedState['selectedIndex']].text;
    let selectedStateId = 1;
    this.stateList.filter(item => {
      if(val == item.name){
        selectedStateId = item.id;
      }
    })
    if(id == 'state'){
      this.billingUserData.bstate = selectedStateId
    }else {
      this.shippingUserData.sState = selectedStateId
    }
    this.getCityList(selectedStateId);
  }

  selectCity(id){
    let selectedCity = document.getElementById(id);
    let val = selectedCity['options'][selectedCity['selectedIndex']].text;
    console.log('selected city is ---',val);
    let selectedCityId = 1;
    this.cityList.filter(item => {
      if(val == item.name){
        selectedCityId = item.id;
      }
    })
    if(id == 'city'){
      this.billingUserData.bcity = selectedCityId
    }else {
      this.shippingUserData.sCity = selectedCityId
    }
  }

  getstatelist(id) {
    this.util.presentLoading();
    this.http.get('https://www.indimedo.com/api/get-state-list?country_id='+id).subscribe(result => {
      this.stateList = result;
      this.util.dismissLoading();
    },
    );
  }

  getCartItem() {
    let loginData = {
      uid: this.uid,
      udid: this.udid
    };
    this.util.presentLoading();
    this.http.post('https://www.indimedo.com/api/getCartItems', loginData).subscribe(result => {
          this.getCountryList();
          if (result['products'] !== 'cart is empty') {
          this.getallcartItems = result['products'];
          console.log('this.getallcartItems >>>>>>>>', this.getallcartItems);
          }else {
            this.getallcartItems = [];
          }
          this.util.dismissLoading();
    },
    );
  }

  getCartAmount() {
    var loginData = {
      uid: this.uid,
      udid: this.udid
    };
    this.http.post('https://www.indimedo.com/api/getCartAmount', loginData).subscribe(result => {
          console.log("4.success getCartAmount >>",result);
      this.cartamount = result['amount']
      // return false;
      this.util.dismissLoading();
    },
    );
  }

  private getCityList(selectedStateId) {
    this.util.presentLoading();
    this.http.get('https://www.indimedo.com/api/get-city-list?state_id='+selectedStateId).subscribe(result => {
          this.cityList = result;
          this.util.dismissLoading();
        },
    );
  }

  private callBillingAddressApi() {

    this.http.post('https://www.indimedo.com/api/addBillingAddress', this.billingUserData).subscribe(result => {
          console.log('success billing api response >>>', result);
          if(result['data']==true){
            if(this.cashondeliveryvalue==1){
              this.cashondeliveryvalue='';
              swal.fire(
                'Good job!',
                'You Purchased Successfully!',
                'success'
              )
              this.nav.setRoot(OrderlistPage);

            }
          }
          this.util.presentToast(result['message']);
          this.util.dismissLoading();
        },
    );
  }

  private callShippingAddressApi() {
    this.http.post('https://www.indimedo.com/api/addShippingAddress', this.shippingUserData).subscribe(result => {
          console.log('success shipping api response >>>', result);
          if(result['data']==true){
            if(this.cashondeliveryvalue==1){
              this.cashondeliveryvalue='';
              swal.fire(
                'Good job!',
                'You Purchased Successfully!',
                'success'
              )
              this.nav.setRoot(OrderlistPage);

            }
          }
          this.util.presentToast(result['message']);
          this.util.dismissLoading();
        },
    );
  }

  cashondelivery(event){
   
    if(event.target.value=='cod'){
      this.cashondeliveryvalue=1
    }
  }

  placeOrder(){

    this.util.presentLoading();
    this.callBillingAddressApi();
    this.callShippingAddressApi();
  }
}
