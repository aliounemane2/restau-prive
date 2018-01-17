import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeValidatePage } from './code-validate';

@NgModule({
  declarations: [
    CodeValidatePage,
  ],
  imports: [
    IonicPageModule.forChild(CodeValidatePage),
  ],
  exports: [
    CodeValidatePage
  ]
})
export class CodeValidatePageModule {}
