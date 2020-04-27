import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { UserauthProvider } from '../providers/userauth/userauth';
import { HttpClientModule } from '@angular/common/http';
import { UtilProvider } from '../providers/util/util';

import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Network } from '@ionic-native/network';
import {MyAccountPage} from "../pages/myaccount/myaccount";
import {CategoryPage} from "../pages/categories/categories";
import {ProductCategoryPage} from "../pages/ProductCategory/ProductCategory";
import {ProductListingPage} from "../pages/ProductListing/ProductListing";
import {WomenCategoryPage} from "../pages/womencategory/womencategory";
import {CartdetailPage} from "../pages/cartdetail/cartdetail";
import {KidsCategoryPage} from "../pages/kidscategory/kidscategory";
import {Home_livingCategoryPage} from "../pages/home_living/home_living";
import {beautyCategoryPage} from "../pages/beautycare/beautycare";
import {ElectronicCategoryPage} from "../pages/electronics/electronics";
import {FilterPage} from "../pages/filter/filter";
import {AddNewAddressPage} from "../pages/addnewaddress/addnewaddress";
import {ContactPage} from "../pages/contact/contact";
import {OrderdetailPage} from "../pages/orderdetail/orderdetail";
import { MyaddressdetailPage } from '../pages/myaddressdetail/myaddressdetail';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { OrderlistPage } from '../pages/orderlist/orderlist';
import { PaymentdetailPage } from '../pages/paymentdetail/paymentdetail';
import { ProfileditPage } from '../pages/profiledit/profiledit';
import { ForgetpasswordPage } from '../pages/forgetpassword/forgetpassword';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {ErrorCheckPage} from '../pages/error-check/error-check';
import { NetworkproviderProvider } from '../providers/networkprovider/networkprovider';
import { Device } from '@ionic-native/device';
import {UploadPrescriptionPage} from '../pages/upload-prescription/upload-prescription';
import {DonationPage} from '../pages/donation/donation';
import {DonotHavePrescriptionPage} from '../pages/donot-have-prescription/donot-have-prescription';
import {FooterPage} from '../pages/footer/footer';
import {AboutusPage} from '../pages/aboutus/aboutus';
import {NewsPage} from '../pages/news/news';
import { CartProvider } from '../providers/cart/cart';
import { MycartPage } from '../pages/mycart/mycart';
import { TermsAndConditionPage } from '../pages/terms-and-condition/terms-and-condition';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { RefundPage } from '../pages/refund/refund';
import { DeliveryandshippingPage } from '../pages/deliveryandshipping/deliveryandshipping';
import { BrowseAZPage } from '../pages/browse-a-z/browse-a-z';
import { AllmedicationbrandsPage } from '../pages/allmedicationbrands/allmedicationbrands';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckoutPage } from "../pages/checkout/checkout";
import { ManageaccountPage } from "../pages/manageaccount/manageaccount";

;@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MyAccountPage,
    CategoryPage,
    ProductCategoryPage,
    ProductListingPage,
    WomenCategoryPage,
    CartdetailPage,
    KidsCategoryPage,
    Home_livingCategoryPage,
    beautyCategoryPage,
    ElectronicCategoryPage,
    FilterPage,
    AddNewAddressPage,
    ContactPage,
    OrderdetailPage,
    MyaddressdetailPage,
    ProductDetailPage,
    OrderlistPage,
    PaymentdetailPage,
    ProfileditPage,
    ForgetpasswordPage,
    ErrorCheckPage,
    UploadPrescriptionPage,
    DonationPage,
    DonotHavePrescriptionPage,
    FooterPage,
    AboutusPage,
    NewsPage,
    MycartPage,
    TermsAndConditionPage,
    PrivacyPolicyPage,
    ContactUsPage,
    RefundPage,
    DeliveryandshippingPage,
    BrowseAZPage,
    AllmedicationbrandsPage,
    CheckoutPage,
    ManageaccountPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: false
    }),
    IonicStorageModule.forRoot(),
    IonicImageViewerModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MyAccountPage,
    CategoryPage,
    ProductCategoryPage,
    ProductListingPage,
    WomenCategoryPage,
    CartdetailPage,
    KidsCategoryPage,
    Home_livingCategoryPage,
    beautyCategoryPage,
    ElectronicCategoryPage,
    FilterPage,
    AddNewAddressPage,
    ContactPage,
    OrderdetailPage,
    MyaddressdetailPage,
    ProductDetailPage,
    OrderlistPage,
    PaymentdetailPage,
    ProfileditPage,
    ForgetpasswordPage,
    ErrorCheckPage,
    UploadPrescriptionPage,
    DonationPage,DonotHavePrescriptionPage,
    FooterPage,
    AboutusPage,
    NewsPage,
    MycartPage,
    TermsAndConditionPage,
    PrivacyPolicyPage,
    ContactUsPage,
    RefundPage,
    DeliveryandshippingPage,
    BrowseAZPage,
    AllmedicationbrandsPage,
    CheckoutPage,
    ManageaccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    SQLite,
    FileTransfer,
    FilePath,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserauthProvider,
    UtilProvider,
    NetworkproviderProvider,
    Device,
    CartProvider
  ]
})
export class AppModule {}
