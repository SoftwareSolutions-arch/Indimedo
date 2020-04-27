import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UtilProvider } from '../../providers/util/util';
import swal from "sweetalert2";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CheckoutPage } from "../checkout/checkout";

@IonicPage()
@Component({
  selector: 'page-mycart',
  templateUrl: 'mycart.html',
})
export class MycartPage {
  qty = "1";
  uid = "1";
  udid = "a2g6";
  ALlOrde = [];
  getallcartItems: string[] = [];
  cartcount: any;
  cartamount: any;
  constructor(public navCtrl: NavController,    public formBuilder: FormBuilder,
    public navParams: NavParams,private http: HttpClient,public util: UtilProvider,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MycartPage');
  }


  ionViewWillEnter() {
    this.getCartItems();
    this.getCartAmount();
  }

  ngOnInit(){
    this.getCartItems();
    this.getCartAmount();
  }

  getCartItems() {
    var loginData = {
      uid: this.uid,
      udid: this.udid
    };
    this.http.post('https://www.indimedo.com/api/getCartItems', loginData).subscribe(result => {
      if (result['products'] !== 'cart is empty') {
        this.getallcartItems = result['products'];
        // this.fliterfunction();
        // this.getallcartItems = this.getallcartItems.filter(item =>{
        //   item.item_qty = 1;
        // })
      }
      else {
        this.getallcartItems = [];
      }
      // return false;
      this.util.dismissLoading();
    },
    );
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


  incrementQty(allItems){
    allItems.qty=parseInt(allItems.qty)+1;
    this.cartamount=this.cartamount+allItems.discounted_price;
  }

    
    
    //decrements item
    
    decrementQty(allItems){
      if(allItems.qty>1){
        allItems.qty=parseInt(allItems.qty)-1;
        this.cartamount=this.cartamount-allItems.discounted_price;
      }
    }

    Checkout(){
      this.navCtrl.push(CheckoutPage);
    }

    getCartAmount() {
      var loginData = {
        uid: this.uid,
        udid: this.udid
      };
      this.http.post('https://www.indimedo.com/api/getCartAmount', loginData).subscribe(result => {
        this.cartamount = result['amount']
        // return false;
        this.util.dismissLoading();
      },
      );
    }

     updateCart(){
       this.util.presentLoading()
        this.getallcartItems.forEach(item =>{
          let cartData = {
             id: item['id'],
             qty: item['qty']
           };
           this.http.post('https://www.indimedo.com/api/updateCartItem', cartData).subscribe(result => {
                 console.log('success >>>>>>>', result);
                 this.util.dismissLoading();
                 this.util.presentToast('Cart updated Successfully');
               },
           );
        })
      }
}
