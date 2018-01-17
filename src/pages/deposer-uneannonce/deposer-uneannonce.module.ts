import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeposerUneannoncePage } from './deposer-uneannonce';

@NgModule({
  declarations: [
    DeposerUneannoncePage,
  ],
  imports: [
    IonicPageModule.forChild(DeposerUneannoncePage),
  ],
  exports: [
    DeposerUneannoncePage
  ]
})
export class DeposerUneannoncePageModule {}
