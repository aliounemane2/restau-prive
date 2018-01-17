import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewAnnoncePage } from '../view-annonce/view-annonce';

/**
 * Generated class for the ResultRecherchePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-result-recherche',
  templateUrl: 'result-recherche.html',
})
export class ResultRecherchePage {
annonce :any;
parent : any;
link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  if(navParams.get("annonce") !== "undefined" && navParams.get("link") !== "undefined"){
        this.annonce = navParams.get("annonce");
        this.link = navParams.get("link");
        console.log(this.annonce);
    }
    this.parent='liste-annonce';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultRecherchePage');
  }

  itemTapped(event, annonce,parent) { 
        this.navCtrl.push(ViewAnnoncePage, {
            'annonce': annonce,
            'parent': parent
        });
    }

}
