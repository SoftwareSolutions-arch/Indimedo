import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";


@IonicPage()
@Component({
  selector: 'page-upload-prescription',
  templateUrl: 'upload-prescription.html',
})
export class UploadPrescriptionPage {
  base64Image: any;
  picture:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPrescriptionPage');
  }
  takePicture() {
 this.camera.getPicture({
 targetWidth:512,
 targetHeight:512,
 correctOrientation:true,
 sourceType: this.camera.PictureSourceType.CAMERA,
 destinationType: this.camera.DestinationType.DATA_URL
   }).then((imageData) => {

     this.base64Image = 'data:image/jpeg;base64,'+imageData;

     this.picture = imageData;

         }, (err) => {

     console.log(err);

   });
  }

  aceesGallery(){
    this.camera.getPicture({

      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,

      destinationType: this.camera.DestinationType.DATA_URL

     }).then((imageData) => {

       this.base64Image = 'data:image/jpeg;base64,'+imageData;

       this.picture = imageData;

          }, (err) => {

       console.log(err);

     });
  }

  gotoCategory(){
  }

  submitform(){}
}
