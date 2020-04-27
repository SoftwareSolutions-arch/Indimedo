import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseAZPage } from './browse-a-z';

@NgModule({
  declarations: [
    BrowseAZPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseAZPage),
  ],
})
export class BrowseAZPageModule {}
