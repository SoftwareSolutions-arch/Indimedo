import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPrescriptionPage } from './upload-prescription';

@NgModule({
  declarations: [
    UploadPrescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadPrescriptionPage),
  ],
})
export class UploadPrescriptionPageModule {}
