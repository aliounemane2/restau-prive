import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPaiementPage } from './new-paiement';

@NgModule({
  declarations: [
    NewPaiementPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPaiementPage),
  ],
  exports: [
    NewPaiementPage
  ]
})
export class NewPaiementPageModule {}
