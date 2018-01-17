import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavbarComponent } from './navbar';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    IonicPageModule.forChild(NavbarComponent),
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarComponentModule {}
