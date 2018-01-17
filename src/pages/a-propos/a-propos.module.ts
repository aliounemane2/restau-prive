import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AProposPage } from './a-propos';

@NgModule({
  declarations: [
    AProposPage,
  ],
  imports: [
    IonicPageModule.forChild(AProposPage),
  ],
  exports: [
    AProposPage
  ]
})
export class AProposPageModule {}
