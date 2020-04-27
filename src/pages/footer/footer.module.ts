import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FooterPage } from './footer';
import { TermsAndConditionPage } from '../terms-and-condition/terms-and-condition';

@NgModule({
  declarations: [
    FooterPage,TermsAndConditionPage
  ],
  imports: [
    IonicPageModule.forChild(FooterPage),
  ],
})
export class FooterPageModule {}
