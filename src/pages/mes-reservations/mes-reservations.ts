import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { NewPaiementPage } from '../new-paiement/new-paiement';
import { DetailsReservationPage } from '../details-reservation/details-reservation';
import { FormAvisPage } from '../form-avis/form-avis';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the MesReservationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mes-reservations',
  templateUrl: 'mes-reservations.html',
})
export class MesReservationsPage {
	reservations: Array<any>;
  menu: any;
  link : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController, public storage: Storage,private alertCtrl: AlertController, public connectivityService:ConnectivityServiceProvider) {
    this.storage.get('name').then((val) => {
      console.log('Your name is', val);
      this.menu = val;
    })
    this.link = this.annonceService.getLink();
    console.log(this.link);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesReservationsPage');
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
  	});

  	loader.present().then(() => {
      if(this.menu == 'Reservations à venir'){
        this.annonceService.reservationComing().subscribe(
          data => {
              this.reservations = data.reservations; 
              
              if(this.reservations.length == 0){
              let titre = "Pas de reservations à venir";
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
              let titre = "Une erruer est survenue reessayer plus tard";
              this.presentPromptOk(titre);
          },
          () => {loader.dismiss()}
        );
      }

      else if(this.menu == 'Reservations passées'){
        this.annonceService.reservationPast().subscribe(
          data => {
              this.reservations = data.reservations; 
              if(this.reservations.length == 0){
              let titre = "Pas de reservations passées"
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
              let titre = "Une erruer est survenue reessayer plus tard";
              this.presentPromptOk(titre);
          },
          () => {loader.dismiss()}
        );
      }

      else if(this.menu == 'Reservations annulées'){
        this.annonceService.reservationAnnulee().subscribe(
          data => {
              this.reservations = data.reservations; 
              if(this.reservations.length == 0){
              let titre = "Pas de reservations annulées"
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
              let titre = "Une erruer est survenue reessayer plus tard";
              this.presentPromptOk(titre);
          },
          () => {loader.dismiss()}
        );
      }
      else{
        this.storage.set('name', 'Reservations à venir');
        this.storage.get('name').then((val) => {
          console.log('Your name is', val);
          this.menu = val;
        })
        this.annonceService.reservationComing().subscribe(
          data => {
              this.reservations = data.reservations; 
              
              if(this.reservations.length == 0){
              let titre = "Pas de reservations à venir"
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
              let titre = "Une erruer est survenue reessayer plus tard";
              this.presentPromptOk(titre);
          },
          () => {loader.dismiss()}
        );

      }


		});
  }

  goToNewPaiement(donnees){
  this.navCtrl.push(NewPaiementPage,{
        'reservation': donnees});
  }
  

  itemTapped(event, reservation, menu) { 
        this.navCtrl.push(DetailsReservationPage, {
            'reservation': reservation,
            'menu' : menu
        });
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
