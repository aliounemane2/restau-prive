import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormAvisPage } from './form-avis';

@NgModule({
  declarations: [
    FormAvisPage,
  ],
  imports: [
    IonicPageModule.forChild(FormAvisPage),
  ],
  exports: [
    FormAvisPage
  ]
})
export class FormAvisPageModule {}
