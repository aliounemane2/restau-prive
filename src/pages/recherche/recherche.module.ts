import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecherchePage } from './recherche';

@NgModule({
  declarations: [
    RecherchePage,
  ],
  imports: [
    IonicPageModule.forChild(RecherchePage),
  ],
  exports: [
    RecherchePage
  ]
})
export class RecherchePageModule {}
