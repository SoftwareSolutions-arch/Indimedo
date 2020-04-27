import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErrorCheckPage } from './error-check';

@NgModule({
  declarations: [
    ErrorCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(ErrorCheckPage),
  ],
})
export class ErrorCheckPageModule {}
