import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesReservationsPage } from './mes-reservations';

@NgModule({
  declarations: [
    MesReservationsPage,
  ],
  imports: [
    IonicPageModule.forChild(MesReservationsPage),
  ],
  exports: [
    MesReservationsPage
  ]
})
export class MesReservationsPageModule {}
