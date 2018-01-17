import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadingModalComponent } from './loading-modal';

@NgModule({
  declarations: [
    LoadingModalComponent,
  ],
  imports: [
    IonicPageModule.forChild(LoadingModalComponent),
  ],
  exports: [
    LoadingModalComponent
  ]
})
export class LoadingModalComponentModule {}
