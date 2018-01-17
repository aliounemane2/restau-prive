import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAnnoncePage } from './view-annonce';

@NgModule({
  declarations: [
    ViewAnnoncePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAnnoncePage),
  ],
  exports: [
    ViewAnnoncePage
  ]
})
export class ViewAnnoncePageModule {}
