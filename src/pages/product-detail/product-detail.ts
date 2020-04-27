import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartdetailPage } from '../cartdetail/cartdetail';
import { OrderdetailPage } from '../orderdetail/orderdetail';
import { UtilProvider } from '../../providers/util/util';
import { UserauthProvider } from '../../providers/userauth/userauth';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})

export class ProductDetailPage {
  AllProductDetail = [];
  productDetail: any;
  ImageUrl = '';
  productDetailImage:any;
  catid:any;
  productname:any;
  productprice:any;
  productdiscount:any;
  productdescription:any;
  productdetails:any;
  productdiscount_type:any;
  productdiscounted_price:any;
  productimage:any;
  productreviews:any;
  productrating:any;
  variations=[];
  size=[];
  variationdetail:any;
  divState = {}; // we store the status in this object
  divStateColor={};
  constructor(public navCtrl: NavController,public util: UtilProvider,
    public userAuth: UserauthProvider,
    private storage: Storage,
    private params: NavParams) {
      
    this.catid = params.get('catid');
    this.userAuth.catid = this.catid;
    this.getData(this.catid);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
  openCart(){
    this.navCtrl.push(CartdetailPage);
  }
  openOrderSummary(){
    this.navCtrl.push(OrderdetailPage);
  }
  getData(item) {
    this.util.presentLoading();
    this.userAuth.getProductDetail().then((result) => {
      if (result["message"] != 'succes') {
        console.log(result);
        this.util.dismissLoading();
        this.util.presentCustomToast('No data found!');
      }
      else {
        this.AllProductDetail.push(result); // 2
        this.storage.set('productdetail', this.AllProductDetail); // 4
        this.productDetailImage = this.AllProductDetail[0].images["data"];
        this.productname = this.AllProductDetail[0].product["name"];
        this.productprice = this.AllProductDetail[0].product["price"];
        this.productdetails = this.AllProductDetail[0].product["details"];
        this.variations = this.AllProductDetail[0]["variations"]["data"]["Color"];
        this.size = this.AllProductDetail[0]["variations"]["data"]["Size"];
        this.productdescription = this.AllProductDetail[0].product["description"];
        this.productimage = this.AllProductDetail[0].product["image"];
        this.productdiscounted_price = this.AllProductDetail[0].product["discounted_price"];
        this.productdiscount = this.AllProductDetail[0].product["discount"];
        this.productdiscount_type = this.AllProductDetail[0].product["discount_type"];
        this.util.dismissLoading();
      }


    }).catch((error: any) => {
      if (error.data == undefined) {
        this.util.presentAlertData();
      }
      else {
        this.util.presentAlert();
      }
     
      
    })
  }

  changeView(item) {
    this.productimage = item;
  }
  // toggleLevel1(idx,i) {
  //   var check = document.getElementById('td_' + idx +i);
  //   if(check.style.backgroundColor == 'rgb(59, 176, 234)'){
  //     check.style.setProperty('background-color', 'white');
      
     
  //   }
  //   else{
  //     check.style.setProperty('background-color', '#3bb0ea');
  //     console.log(check.previousSibling.parentElement);
  //   }
   
  // };
  showhide(id) {
    if (document.getElementById) {
        var divid = document.getElementById(id);

        this.divState[id] = (this.divState[id]) ? false : true; // initialize / invert status (true is visible and false is closed)
        //close others
        for (var div in this.divState){
            if (this.divState[div] && div != id){ // ignore closed ones and the current
                document.getElementById(div).style.backgroundColor = 'white'; // hide
                this.divState[div] = false; // reset status
            }
        }
        divid.style.backgroundColor = (divid.style.backgroundColor == '#3bb0ea' ? 'white' : '#3bb0ea');
    }
}
showhideColor(id) {
  if (document.getElementById) {
      var divid = document.getElementById(id);

      this.divStateColor[id] = (this.divStateColor[id]) ? false : true; // initialize / invert status (true is visible and false is closed)
      //close others
      for (var div in this.divStateColor){
          if (this.divStateColor[div] && div != id){ // ignore closed ones and the current
              document.getElementById(div).style.border = '0px solid black'; // hide
              this.divStateColor[div] = false; // reset status
          }
      }
      divid.style.border = (divid.style.border == '2px solid black' ? '0px solid black' : '2px solid black');
  }
}
}
