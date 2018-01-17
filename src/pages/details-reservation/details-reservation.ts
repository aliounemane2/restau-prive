import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { NewPaiementPage } from '../new-paiement/new-paiement';
import { ReservationModalPage } from '../reservation-modal/reservation-modal';
import { FormAvisPage } from '../form-avis/form-avis';
import { MenuPage } from '../menu/menu';
import {StorageUtils} from '../../Utils/storage.utils';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the DetailsReservationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details-reservation',
  templateUrl: 'details-reservation.html',
})
export class DetailsReservationPage {
	reservation : any;
  menu: any;
  parent :any;
  token : any;
  link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController,public modalCtrl: ModalController,private alertCtrl: AlertController, public toast : Toast, public connectivityService:ConnectivityServiceProvider) {
    if(navParams.get("reservation") !== "undefined"  && navParams.get("menu") !== "undefined" )
  	{
  	  this.reservation = navParams.get("reservation");
      this.menu = navParams.get("menu");
      console.log(this.menu);
  	  console.log(this.reservation);
      this.link = this.annonceService.getLink();
        console.log(this.link);
  	}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsReservationPage');
  }

  openModal() {
    let res = {'reservation': this.reservation, 'parent' :  'detailsreservation', 'titre': 'Modifier une reservation'};
    let myModal = this.modalCtrl.create(ReservationModalPage,res);
    console.log(res);
    myModal.present();
  }

  goToMenuReservation(){
    this.token = StorageUtils.getToken();
    console.log(this.token);
    if(this.token != null){
      this.navCtrl.push(MenuPage, {
            'reservation': this.reservation, 
            'parent' :  'detailsreservation', 
            'titre': 'Modifier une reservation'
        })
      
    }
    else{
      console.log('Veuillez vous connecter');     
    }

  }

  annulerReservation(idannonce ,idreservation)
  { 
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });
    loader.present().then(() => {
    this.annonceService.annulerReservation(this.reservation.annonce.id,this.reservation.id).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Validation reservation';
          let message: any =data.message;
          if(this.reservation.paiement){
            this.presentPrompt();
          }
          else{
            this.presentPromptOk();
          }
          
        },
        err => {
          console.log(err);
          loader.dismiss();
        },
        ()  => {loader.dismiss()}
        );

    }); 
  }

  goToNewPaiement(donnees,parent){
  this.parent = 'newreservation';
  parent = this.parent;
  this.navCtrl.push(NewPaiementPage,{
        'reservation': donnees,
        'parent' : parent});
  }

  goToAvis(donnees){
  this.navCtrl.push(FormAvisPage,{
        'reservation': donnees});
  }

  presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'Remboursement',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Recevoir rembouresement',
        handler: data => {
          this.connectivityService.checkNetwork();
          let loader = this.loading.create({
            content: 'Chargement en cours...',
          });

          loader.present().then(() => {
          this.annonceService.rembourserReservation(this.reservation.id).subscribe(
            data => {
              console.log(data);

              let titre: any='Message';
              let sousTitre: any= 'Validation reservation';
              let message: any =data.message;
              this.showToast(message);
            },
            err => {
              console.log(err);
              loader.dismiss();
              this.showToast("Une erruer est survenue ressayer plus tard");
            },
            ()  => {loader.dismiss()}
            );

          }); 
        }
      }
    ]
  });
  alert.present();
}

presentPromptOk() {
  let alert = this.alertCtrl.create({
    title: 'Reservation annulée',
    buttons: [
      {
        text: 'Ok',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
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
