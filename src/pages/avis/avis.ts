import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { TabsPage } from '../tabs/tabs';
import {NavbarComponent} from '../../components/navbar/navbar';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

/**
 * Generated class for the AvisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-avis',
  templateUrl: 'avis.html',
})
export class AvisPage {

   avis: Array<any>;
   link: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController,private alertCtrl: AlertController, private modalCtrl: ModalController, public connectivityService:ConnectivityServiceProvider) {
    this.link = this.annonceService.getLink();
    console.log(this.link);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvisPage');
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
  	});

    	loader.present().then(() => {

  	    this.annonceService.avis().subscribe(
  		      data => {
  		          this.avis = data.annonces; 
  		          console.log(this.avis);

                if(this.avis.length == 0){
                  let titre = "Pas d'avis"
                  this.presentPromptOk(titre);
                  console.log(this.avis);

                  }
                  else{
                    console.log(this.avis);
                     this.showAddressModal();
                    
                  }
  		      },
  		      err => {
  		          console.log(err);
  		      },
  		      () => {loader.dismiss()}
  		);		  
  	});
  }

  showAddressModal () {
    this.navCtrl.push(NavbarComponent, {
      'avis': 'this.avis'
    });
    /*console.log('petit dej');
    let modal = this.modalCtrl.create(NavbarComponent);
    let me = this;
    modal.onDidDismiss(data => {
      
    });
    modal.present();*/
  }

  presentPromptOk(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            //this.viewCtrl.dismiss();
            this.navCtrl.push(TabsPage, {
            'notification': 'notification'
        });
          }
        }
      ]
    });
    alert.present();
  }

}
