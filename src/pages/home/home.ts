import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  PopoverController,
  MenuController,
  Platform
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { UtilProvider } from "../../providers/util/util";
import { UserauthProvider } from "../../providers/userauth/userauth";
import { ProductListingPage } from "../ProductListing/ProductListing";
import { Slides } from "ionic-angular";
import { UploadPrescriptionPage } from "../upload-prescription/upload-prescription";
import { DonotHavePrescriptionPage } from "../donot-have-prescription/donot-have-prescription";
import { DonationPage } from "../donation/donation";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MyAccountPage } from "../myaccount/myaccount";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { CartdetailPage } from "../cartdetail/cartdetail";
import swal from "sweetalert2";
import { MycartPage } from "../mycart/mycart";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  shopping: boolean = false;
  // search condition
  @ViewChild("slides") slides: Slides;

  user_id: number;
  bannermiddle = [];
  ShopbyHealthConcern = [];
  AllProductsHomePage = []; // 0
  FeaturedBrands = [];
  PopularHealthProducts = [];
  ShopbyCategories = [];
  AmazingOffers = [];
  topbanner = [];
  id = "11";
  qty = "1";
  uid = "1";
  udid = "a2g6";
  ALlOrde = [];
  getallcartItems: string[] = [];
  cartcount: any;
  cartamount: any;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    public nav: NavController,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController,
    public menu: MenuController,
    public sqlite: SQLite,
    public util: UtilProvider,
    public userAuth: UserauthProvider,
    public platform: Platform
  ) {
    this.menu.enable(true);
    this.platform = platform;
    // this.createDB();
    //this.getData();
    this.storage.get("user_id").then(value => {
      this.user_id = value;
    });

    /*var loginData = {
      uid: this.uid,
      udid: this.udid
    };
    this.http.post('https://www.indimedo.com/api/getCartCount', loginData).subscribe(result => {
      // return false;
      this.cartcount = result['cart']
      // console.log("result22", this.cartcount)
      this.util.dismissLoading();
    },
    );

    this.http.post('https://www.indimedo.com/api/getCartAmount', loginData).subscribe(result => {

      console.log("getCartAmount", result)
      this.cartamount = result['amount']

      // return false;
      this.util.dismissLoading();
    },
    );*/
  }

  ionViewWillEnter() {
    this.getData();
    //this.getCartItems();
    //this.getCartCount();
    // this.getCartAmount();
    // this.clearCart();
    // this.addTocart(slide);
  }

  getData() {
    this.util.presentLoading();
    this.userAuth.getListData()
      .then(result => {
        console.log("1.success getData >>>", result);
        this.getCartItems();
        this.AllProductsHomePage.push(result); // 2
        this.storage.set("products", this.AllProductsHomePage); // 4
        this.topbanner = this.AllProductsHomePage[0].bannertop["data"];
        this.bannermiddle = this.AllProductsHomePage[0].bannermiddle["data"];
        this.FeaturedBrands = this.AllProductsHomePage[0].featuredbrands[
          "data"
        ];
        this.PopularHealthProducts = this.AllProductsHomePage[0].healthproducts[
          "data"
        ];
        this.ShopbyCategories = this.AllProductsHomePage[0].shopbycategories[
          "data"
        ];
        this.ShopbyHealthConcern = this.AllProductsHomePage[0].shopbyhealthconcern[
          "data"
        ];
        this.AmazingOffers = this.AllProductsHomePage[0].bannerbottom["data"];
      })
      .catch((error: any) => {
        if (error.data == undefined) {
          console.log(error);
          this.util.presentAlertData();
        } else {
          this.util.presentAlert();
        }
      });
  }
  nextSlide() {
    this.slides.slideNext();
  }
  prevSlide() {
    this.slides.slidePrev();
  }
  UploadPrescription() {
    this.navCtrl.push(UploadPrescriptionPage);
  }
  Donation() {
    this.navCtrl.push(DonationPage);
  }

  addTocarts(slide) {
    var loginData = {
      uid: this.uid,
      udid: this.udid,
      id: slide.id,
      qty: this.qty
    };
    this.util.presentLoading();
    return new Promise((resolve, reject) => {
      this.http.post('https://www.indimedo.com/api/addToCart', loginData).subscribe(result => {
        console.log("result",result)
        if (result["status"] == "true") {
          this.ionViewWillEnter();
          this.util.dismissLoading();
        } else {
          this.util.presentToast(result["message"]);
        }
      },
        err => {
          reject(err);
        }
      );
    });
  }

  deleteactivity(allItems) {
    let formData = new FormData();
    formData.append("id", allItems.id);
    swal.fire({
      title: 'Are you sure?',
      text: "Once deleted, you will not be able to recover this.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.http.post("https://www.indimedo.com/api/removeCartItem", formData).subscribe(data => {
          this.ionViewWillEnter();
          if (data) {
            this.ionViewWillEnter();
            swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      }
      else {
        swal.fire('Cart item is safe!')
      }
    });
  }

  removeCartItem(slide) {
    var loginData = {
      id: slide.id
    };
    this.http.post('https://www.indimedo.com/removeCartItem', loginData).subscribe(result => {

      // return false;
      this.util.dismissLoading();
    },
    );
  }

  getCartCount() {
    var loginData = {
      uid: this.uid,
      udid: this.udid
    };
    this.http.post('https://www.indimedo.com/api/getCartCount', loginData).subscribe(result => {
          console.log("3.success getCartCount >>",result);
          this.getCartAmount();
          this.cartcount = result['cart']
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

  updateCartItem(slide) {
    var loginData = {
      id: slide.id
    };
    // id=3 
    this.http.post('https://www.indimedo.com/updateCartItem', loginData).subscribe(result => {

      // return false;
      this.util.dismissLoading();
    },
    );
  }

  getCartItems() {
    var loginData = {
      uid: this.uid,
      udid: this.udid
    };
    this.http.post('https://www.indimedo.com/api/getCartItems', loginData).subscribe(result => {
          console.log("2.success getCartItems >>",result);
          this.getCartCount();
          if (result['products'] !== 'cart is empty') {
        this.getallcartItems = result['products'];
      }
      else {
        this.getallcartItems = [];
      }
    },
    );
  }

  clearCart() {
    var loginData = {
      uid: this.uid,
      udid: this.udid
    };
    // id=3 
    this.http.post('https://www.indimedo.com/clearCart', loginData).subscribe(result => {

      // return false;
      this.util.dismissLoading();
    },
    );
  }

  DonthavePrescription() {
    this.navCtrl.push(DonotHavePrescriptionPage);
  }

  // clearCart() {
  //   console.log(this.udid, "serverUmangData");
  //   const loginData = new FormData();
  //   loginData.append("udid", this.udid);
  //   loginData.append("uid", this.uid);

  //   console.log(loginData, "loginData@@@@@@@@@@@");
  //   // return false

  //   this.util.presentLoading();
  //   return new Promise((resolve, reject) => {
  //     console.log(loginData, "loginData");

  //     // alert("Heloo");
  //     // return false
  //     this.http.post(this.userAuth.apiIneerPage + "getCartItems", loginData).subscribe(
  //         result => {
  //           console.log("REsult from server", result);
  //           this.util.dismissLoading();
  //           if (result["status"] == "true") {
  //             //Display sucess Toast
  //             this.util.presentToast(result["message"]);
  //             //Redirect to dashboard

  //             this.navCtrl.setRoot(HomePage);
  //           } else {
  //             this.util.presentToast(result["message"]);
  //           }
  //         },
  //         err => {
  //           reject(err);
  //         }
  //       );
  //   });
  // }

  openCarts() {
    console.log("hello user datagram")
    // alert("hello")
    this.shopping = true;
    // $("#cart").on("click", function() {
    //   $(".shopping-cart").fadeToggle( "slow");
    // });
    // this.navCtrl.push(CartdetailPage);
  }

  mybutton() {
    this.shopping = false;
  }
  checkout() {
    this.navCtrl.push(MycartPage);
  }
}
