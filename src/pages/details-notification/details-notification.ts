import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

/**
 * Generated class for the DetailsNotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details-notification',
  templateUrl: 'details-notification.html',
})
export class DetailsNotificationPage {
	notification: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public annonceService:AnnonceServiceProvider, public toast: Toast, public connectivityService:ConnectivityServiceProvider) {
	  if(navParams.get("notification") !== "undefined")
	  {
	    this.notification = navParams.get("notification");
	    console.log(this.notification);
	  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsNotificationPage');
  }


  validerReservation()
  { 
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });
    loader.present().then(() => {
    this.annonceService.validerReservation(this.notification.reservation.id).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Validation reservation';
          let message: any =data.message;
          this.showToast(message);
          //this.alertBox(titre,sousTitre,message);
        },
        err => {
          console.log(err);
          loader.dismiss();
          this.showToast("Une erreur est survenue reessayer plus tard");
        },
        ()  => {loader.dismiss()}
        );

    }); 
  }

  declinerReservation()
  { 
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });
    loader.present().then(() => {
      this.annonceService.declinerReservation(this.notification.reservation.id).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Validation reservation';
          let message: any =data.message;
          this.showToast(message);
          //this.alertBox(titre,sousTitre,message);
        },
        err => {
          console.log(err);
          loader.dismiss();
          this.showToast("Une erreur est survenue reessayer plus tard");
        },
        ()  => {loader.dismiss()}
      );

    }); 
  }

  showToast(titre)
  {
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
      }
    );
  }

}
