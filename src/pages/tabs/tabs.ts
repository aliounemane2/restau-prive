import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserRegisterPage } from '../user-register/user-register';
import { LoginPage } from '../login/login';
import { AProposPage } from '../a-propos/a-propos';
import { MenuPage } from '../menu/menu';
import { DeposerUneannoncePage } from '../deposer-uneannonce/deposer-uneannonce';
import { ListeAnnoncePage } from '../liste-annonce/liste-annonce';
import { NotificationPage } from '../notification/notification';
import {StorageUtils} from '../../Utils/storage.utils';
import { DashbordPage } from '..dashbord/dashbord';
import { MesAnnoncesPage } from '../mes-annonces/mes-annonces';
import { MesReservationsPage } from '../mes-reservations/mes-reservations';
import { AvisPage } from '../avis/avis';
import { PaiementPage } from '../paiement/paiement';
import { ProfilPage } from '../profil/profil';
import { RecherchePage } from '../recherche/recherche';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
	rechercher: any = HomePage;
	publier : any ;
	mon_comtpe : any =RecherchePage;
	decouvrir_rp: any = ListeAnnoncePage;
  token : any

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast: Toast, private events: Events) {
    events.subscribe('user:loadTabs', (userEventData) => {
      this.token = StorageUtils.getToken();
      console.log(this.token);
    });
    this.token = StorageUtils.getToken();
    if(this.token == null){
      this.publier = LoginPage;
      //this.showToast("Veuillez vous connecter pour pouvoir publier une annoce");
    }
    else{

      this.publier = DeposerUneannoncePage;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  showToast(titre){
      this.toast.show(titre, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }

}
