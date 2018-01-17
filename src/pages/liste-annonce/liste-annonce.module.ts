import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeAnnoncePage } from './liste-annonce';

@NgModule({
  declarations: [
    ListeAnnoncePage,
  ],
  imports: [
    IonicPageModule.forChild(ListeAnnoncePage),
  ],
  exports: [
    ListeAnnoncePage
  ]
})
export class ListeAnnoncePageModule {}
