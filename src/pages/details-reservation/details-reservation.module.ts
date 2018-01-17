import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsReservationPage } from './details-reservation';

@NgModule({
  declarations: [
    DetailsReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsReservationPage),
  ],
  exports: [
    DetailsReservationPage
  ]
})
export class DetailsReservationPageModule {}
