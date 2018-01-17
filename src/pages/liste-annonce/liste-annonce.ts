import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { DeposerUneannoncePage } from '../deposer-uneannonce/deposer-uneannonce';
import { ViewAnnoncePage } from '../view-annonce/view-annonce';
import { ProfilPage } from '../profil/profil';
import { AProposPage } from '../a-propos/a-propos';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the ListeAnnoncePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-liste-annonce',
  templateUrl: 'liste-annonce.html',
})
export class ListeAnnoncePage {
	annonces: Array<any>;
	date1 : any;
	parent: any;
  link : any;
  message: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController, public connectivityService:ConnectivityServiceProvider,private toast:Toast,public viewctrl : ViewController) {
   	this.parent='liste-annonce';
    this.link = this.annonceService.getLink();
    console.log(this.link);
	   	
    }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeAnnoncePage');
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
  	});

  	loader.present().then(() => {

	    this.annonceService.lesAnnonces().subscribe(
		      data => {
		          this.annonces = data.annonces; 
		          console.log(this.annonces);
              if(this.annonces.length == 0){
                //this.showToast("Pas d'annoce à afficher");
                this.message ="Pas d'annonce disponible";
              }
		          
		      },
		      err => {
		          console.log(err);
		          loader.dismiss();
              this.showToast("Une erreur est survenue reessayer plus tard");
		      },
		      
		      () => {loader.dismiss()}
			);  
		});
    }

    itemTapped(event, annonce,parent) { 
        this.navCtrl.push(ViewAnnoncePage, {
            'annonce': annonce,
            'parent': parent
        });
    }

    showToast(titre){
      this.toast.show(titre, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }

}
