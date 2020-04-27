import { Component } from '@angular/core';
import { Platform, NavController, ActionSheetController, NavParams } from "ionic-angular";
import { ProductDetailPage } from '../product-detail/product-detail';
import { UtilProvider } from "../../providers/util/util";
import { UserauthProvider } from "../../providers/userauth/userauth";
import { Storage } from '@ionic/storage';
import swal from 'sweetalert';
import { ProductListingPage } from '../ProductListing/ProductListing';
// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterPage {
  ImageUrl = '';
  catid: any;
  AllProduct = [];
  productVariations: any;
  variations=[];
  divState = {}; // we store the status in this object
  constructor(
    public navCtrl: NavController,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public util: UtilProvider,
    public userAuth: UserauthProvider,
    private storage: Storage,
    private params: NavParams
  ) {
    this.ImageUrl = this.userAuth.ImageUrl;
    this.catid = params.get('catid');
    this.userAuth.catid = this.catid;
    this.getData();
  }

  ionViewWillEnter() {

    
  }
  openCancel(){
    swal({
        title: 'Are you sure?',
        text: 'You want to Cancel!',
        buttons: ["Yes", "No"],
      }).then((result) => {
        if (result) {
            swal('Filter applied successfully.');
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else  {
        
          swal( 'Filter Cancel');
        }
      })
      this.navCtrl.setRoot(ProductListingPage);
  }
  
  openFilter(){
    swal({
        title: 'Are you sure?',
        text: 'You want to Apply Filter!',
        buttons: ["Yes", "No"],
      }).then((result) => {
        if (result) {
            swal( 'Filter Cancel');
           
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else  {
            swal('Filter applied successfully.');
         
        }
      })
      this.navCtrl.push(ProductListingPage);
  }
  // displaydiv(idx) {
  //   var check = document.getElementById('td_' + idx);
  //   if(idx == "Color"){
  //     if (check.style.display == "none") {
  //       check.style.setProperty('display', 'block');
  //     }
  //     else{
  //       check.style.setProperty('display', 'none');
  //     }
  //   }
    
  //   else if(idx == "Price"){
  //     if (check.style.display == "none") {
  //       check.style.setProperty('display', 'block');
  //     }
  //     else{
  //       check.style.setProperty('display', 'none');
  //     }
  //   }
  //   else if(idx == "Brand"){
  //     if (check.style.display == "none") {
  //       check.style.setProperty('display', 'block');
  //     }
  //     else{
  //       check.style.setProperty('display', 'none');
  //     }
  //   }
  //   else {
  //     if (check.style.display == "none") {
  //       check.style.setProperty('display', 'block');
  //     }
  //     else{
  //       check.style.setProperty('display', 'none');
  //     }
  //   }
  // } 
  getData() {
    this.util.presentLoading();
    this.userAuth.getProductData().then((result) => {
      if (result["products"].data.length == 0) {
        console.log(result);
        this.util.dismissLoading();
        this.util.presentCustomToast('No data found!');
      }
      else {
        this.AllProduct.push(result); // 2
        this.storage.set('product', this.AllProduct); // 4
        this.productVariations = this.AllProduct[0].variation["data"];
        //this.variations = this.AllProduct[0].variation["data"].variation_name["data"];

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
  
 showhide(id) {
    if (document.getElementById) {
        var divid = document.getElementById(id);

        this.divState[id] = (this.divState[id]) ? false : true; // initialize / invert status (true is visible and false is closed)
        //close others
        for (var div in this.divState){
            if (this.divState[div] && div != id){ // ignore closed ones and the current
                document.getElementById(div).style.display = 'none'; // hide
                this.divState[div] = false; // reset status
            }
        }
        divid.style.display = (divid.style.display == 'block' ? 'none' : 'block');
    }
}
}
