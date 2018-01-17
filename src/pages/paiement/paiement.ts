import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { VirementPage } from '../virement/virement';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the PaiementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-paiement',
  templateUrl: 'paiement.html',
})
export class PaiementPage {
	annonces: Array<any>;
	reservations: Array<any>;
	total :any;
	montant:any;
	frais :any;
	menu: any;
	link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController,public storage: Storage,private alertCtrl: AlertController,private toast: Toast, public connectivityService:ConnectivityServiceProvider) {
   	this.storage.get('name').then((val) => {
      console.log('Your name is', val);
      this.menu = val;
    })
    this.link = this.annonceService.getLink();
    console.log(this.link);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaiementPage');
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
  	});

  	loader.present().then(() => {
  		if(this.menu == 'Paiements encaissés'){
  		this.annonceService.paiementEncaisses().subscribe(
		      data => {
		          this.annonces = data.annonces; 
		          //this.montant = this.annonces.reservation.nb_convives * this.annonces.prix;
			      //this.frais = this.montant / 5;
			      //this.total = this.montant + this.frais;

			      if(this.annonces.length == 0){
		            let titre = "Pas de Paiements encaissés";
		            //this.showToast(titre);
		            this.presentPromptOk(titre);
		            console.log(this.annonces);

	              }
	              else{
	                console.log(this.annonces);
	                
	              }
		      },
		      err => {
		          console.log(err);
		          loader.dismiss();
		          let titre = "Une erreur est survenue reessayer plus tard";
		          this.presentPromptOk(titre);
		      },
		      () => {loader.dismiss()}
			);
  		}

  		else if(this.menu == 'Paiements Effectués'){
  			this.annonceService.paiementEffectues().subscribe(
		      data => {
		          this.reservations = data.reservations; 
		          //this.montant = this.annonces.reservation.nb_convives * this.annonces.prix;
			      //this.frais = this.montant / 5;
			      //this.total = this.montant + this.frais;

			      if(this.reservations.length == 0){
		            let titre = "Pas de Paiements Effectués";
		            //this.showToast(titre);
		            this.presentPromptOk(titre);
		            console.log(this.reservations);


	              }
	              else{
	                console.log(this.reservations);
	                
	              }
		      },
		      err => {
		          console.log(err);
		          loader.dismiss();
		          let titre = "Une erreur est survenue reessayer plus tard";
		          this.presentPromptOk(titre);
		      },
		      () => {loader.dismiss()}
			);
  		}
  		else{
  			this.storage.set('name', 'Paiements encaissés');
  			this.storage.get('name').then((val) => {
		      console.log('Your name is', val);
		      this.menu = val;
		    })
  			this.annonceService.paiementEncaisses().subscribe(
		      data => {
		          this.annonces = data.annonces; 
		          //this.montant = this.annonces.reservation.nb_convives * this.annonces.prix;
			      //this.frais = this.montant / 5;
			      //this.total = this.montant + this.frais;

			      if(this.annonces.length == 0){
		            let titre = "Pas de Paiements encaissés"
		            //this.showToast(titre);
		            this.presentPromptOk(titre);
		            console.log(this.annonces);

	              }
	              else{
	                console.log(this.annonces);
	                
	              }
		      },
		      err => {
		          console.log(err);
		          loader.dismiss();
		          let titre = "Une erreur est survenue reessayer plus tard";
		          this.presentPromptOk(titre);
		      },
		      () => {loader.dismiss()}
			);

  		}	  
	});
  }

  goToDeblocagePaiement(annonces){
  	this.navCtrl.push(VirementPage,{
        'annonce': annonces});
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

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
