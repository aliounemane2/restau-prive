import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsNotificationPage } from './details-notification';

@NgModule({
  declarations: [
    DetailsNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsNotificationPage),
  ],
  exports: [
    DetailsNotificationPage
  ]
})
export class DetailsNotificationPageModule {}
