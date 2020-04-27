import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycartPage } from './mycart';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    MycartPage
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(MycartPage),
  ],
})
export class MycartPageModule {}
