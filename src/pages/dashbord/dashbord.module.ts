import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashbordPage } from './dashbord';

@NgModule({
  declarations: [
    DashbordPage,
  ],
  imports: [
    IonicPageModule.forChild(DashbordPage),
  ],
  exports: [
    DashbordPage
  ]
})
export class DashbordPageModule {}
