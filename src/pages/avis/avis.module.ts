import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvisPage } from './avis';

@NgModule({
  declarations: [
    AvisPage,
  ],
  imports: [
    IonicPageModule.forChild(AvisPage),
  ],
  exports: [
    AvisPage
  ]
})
export class AvisPageModule {}
