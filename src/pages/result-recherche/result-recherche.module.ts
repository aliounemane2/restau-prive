import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultRecherchePage } from './result-recherche';

@NgModule({
  declarations: [
    ResultRecherchePage,
  ],
  imports: [
    IonicPageModule.forChild(ResultRecherchePage),
  ],
  exports: [
    ResultRecherchePage
  ]
})
export class ResultRecherchePageModule {}
