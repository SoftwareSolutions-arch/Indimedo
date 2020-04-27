import { Component } from '@angular/core';
import { Platform, NavController, ActionSheetController, NavParams } from "ionic-angular";
import { FilterPage } from "../filter/filter";
import { ProductDetailPage } from '../product-detail/product-detail';
import { UtilProvider } from "../../providers/util/util";
import { UserauthProvider } from "../../providers/userauth/userauth";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'ProductListing',
  templateUrl: 'ProductListing.html'
})

export class ProductListingPage {
  AllProduct = [];
  AllProductSort=[];
  product: any;
  productSort:any;
  ImageUrl = '';
  catid: any;
  sortingcheck =false;
  sort:any;
  sorting=[];
  button:any;
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
    this.catid = this.params.get('catid');
    this.userAuth.catid = this.catid;
    this.sort = "";
    this.getData();
    this.storage.get("sorting").then(value => {
      console.log("Login user id", value);
      this.sorting = value;
    });
  }

  ionViewWillEnter() {


  }

  gotoCategoryDetail(item) {
    this.util.presentLoading();
    this.navCtrl.push(ProductDetailPage, {
      catid: item
    });
  }
  openSort() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'SORT BY'
    });
    for (var i = 0; i < this.sorting.length; i++) {
      this.button = {
        text: this.sorting[i].name,
        handler: this.myFunction.bind(this, i)
      }
      actionSheet.addButton(this.button);
    }
    actionSheet.present();

  }
  myFunction(i) {

    console.log(i);
    this.userAuth.catid = this.catid;
    this.sort=i;
    this.userAuth.sort = this.sort;
    this.AllProductSort=[];
    this.getSortData();
    this.sortingcheck = true;
    document.getElementById('withsorting').style.display = "block";
    document.getElementById('withoutsorting').style.display = "none";
  }
  openFilter() {
    this.navCtrl.push(FilterPage, {
      catid: this.AllProduct[0]["id"]
  });
}
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
        //this.storage.set('product', this.AllProduct); // 4
        this.product = this.AllProduct[0].products["data"];
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
  getSortData() {
    this.util.presentLoading();
    this.userAuth.getSortProductData().then((result) => {
      if (result["products"].data.length == 0) {
        console.log(result);
        this.util.dismissLoading();
        this.util.presentCustomToast('No data found!');
      }
      else {
        this.AllProductSort.push(result); // 2
        //this.storage.set('productSorting', this.AllProductSort); // 4
        this.productSort = this.AllProductSort[0].products["data"];
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
  gotoCategory(){}
}


