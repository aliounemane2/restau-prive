import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

/**
 * Generated class for the DashbordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashbord',
  templateUrl: 'dashbord.html',
})
export class DashbordPage {
users: Array<any>;
id: any;
nom:any;
 nbPoints: any; 
 nbAvis: any;
 imageProfil: any;
 nbAnnonces: any;
 nbAnnoncesNotees: any;
 nbAnnoncesAnnulees: any;
 nbReservations : any;
 prenom: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public userService:UserServiceProvider, public loading: LoadingController, public toast: Toast, public connectivityService:ConnectivityServiceProvider) {

  }

  ionViewDidLoad() {
  	this.connectivityService.checkNetwork();
    console.log('ionViewDidLoad DashbordPage');
    let loader = this.loading.create({
    content: 'Chargement en cours...',
  	});

  	loader.present().then(() => {

	    this.userService.tableauDeBord().subscribe(
		      data => {
		          this.users = data.user; 
		          this.nom = data.user.nom;
		          this.nbPoints = data.user.points;
		          this.nbAvis = data.user.nb_avis;
		          this.imageProfil = data.user.image;
		          this.nbAnnonces = data.user.nb_annonces;
		          this.nbAnnoncesNotees = data.user.nb_annonces_notees;
		          this.nbAnnoncesAnnulees = data.user.nb_annonces_annulees;
		          this.nbReservations = data.user.nb_reservations;
		          this.prenom = data.user.prenom
		          console.log(this.users);
		      },
		      err => {
		          console.log(err);
		          loader.dismiss();
		          this.showToast("Une erreur est survenue ressayer plus tard");
		      },
		      () => {loader.dismiss()}

		);
		  
	});
  }

  	showToast(titre){
	    this.toast.show(titre, '5000', 'bottom').subscribe(
	      toast => {
	      }
	    );
	}

}
