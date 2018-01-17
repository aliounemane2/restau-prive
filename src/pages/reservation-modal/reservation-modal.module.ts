import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationModalPage } from './reservation-modal';

@NgModule({
  declarations: [
    ReservationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationModalPage),
  ],
  exports: [
    ReservationModalPage
  ]
})
export class ReservationModalPageModule {}
