import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,MenuController,NavController,Menu,AlertController, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { UserRegisterPage } from '../pages/user-register/user-register';
import { LoginPage } from '../pages/login/login';
import { AProposPage } from '../pages/a-propos/a-propos';
import { MenuPage } from '../pages/menu/menu';
import { DeposerUneannoncePage } from '../pages/deposer-uneannonce/deposer-uneannonce';
import { ListeAnnoncePage } from '../pages/liste-annonce/liste-annonce';
import { NotificationPage } from '../pages/notification/notification';
import {StorageUtils} from '../Utils/storage.utils';
//import {Push, PushObject, PushOptions} from "@ionic-native/push";
import { DashbordPage } from '../pages/dashbord/dashbord';
import { MesAnnoncesPage } from '../pages/mes-annonces/mes-annonces';
import { MesReservationsPage } from '../pages/mes-reservations/mes-reservations';
import { AvisPage } from '../pages/avis/avis';
import { PaiementPage } from '../pages/paiement/paiement';
import { ProfilPage } from '../pages/profil/profil';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';


declare var FCMPlugin;



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

@ViewChild(Nav) nav: Nav;

//@ViewChild(Menu) menu:Menu;
  rootPage:any = TabsPage;

  pages: Array<{icon: string, title: string, component: any, visible: string, sm: Array<{title:string,component:any,visiblity:string}>}>;
  islogged : any;
  token :any;
  shownGroup = null; 
  groups :any;
  user: any;

  constructor(public platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen,public menu: MenuController, public alertCtrl: AlertController,public storage: Storage, private events: Events,public toast: Toast) {
    this.initializeApp();
    
    /*platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });*/

    events.subscribe('user:signedIn', (userEventData) => {
      this.token = StorageUtils.getToken();
      console.log(this.token);
    });

    events.subscribe('user:lougout', (userEventData) => {
      this.token = StorageUtils.getToken();
      console.log(this.token);
    });

    this.pages = [
      {icon: 'home', title: 'Home', component: TabsPage,visible: '1',sm:[]},
      {icon: 'card', title: 'Inscription', component: UserRegisterPage,visible: '2',sm:[]},
      {icon: 'shirt', title: 'Decouvrir restau privé', component: AProposPage,visible: '1',sm:[] },
      {icon: 'card', title: 'Publier annonce',component: DeposerUneannoncePage,visible: '1',sm:[]},
      {icon: 'log-in', title: 'Login', component: LoginPage,visible: '2' ,sm:[]},
      {icon: 'list', title: 'Liste annonce', component: ListeAnnoncePage,visible: '1',sm:[]},
      {icon: 'card', title: 'Tableau de bord', component: DashbordPage,visible: '0',sm:[]},
      {icon: 'card', title: 'Mes annonces',component: MesAnnoncesPage,visible: '0' ,
        sm:
        [
          {title: 'Annonces à venir',component: MesAnnoncesPage, visiblity: '0'},
          {title: 'Annonces passées',component: MesAnnoncesPage, visiblity: '0'},
          {title: 'Annonces annulées',component: MesAnnoncesPage, visiblity: '0'}
        ]
      },
      {icon: 'card', title: 'Mes reservations',component: MesReservationsPage,visible: '0',
        sm:
        [
          {title: 'Reservations à venir',component: MesReservationsPage, visiblity: '0'},
          {title: 'Reservations passées',component: MesReservationsPage, visiblity: '0'},
          {title: 'Reservations annulées',component: MesReservationsPage, visiblity: '0'}
        ]
      },
      {icon: 'card', title: 'Avis' ,component: AvisPage,visible: '0',sm:[]},
      {icon: 'cash', title: 'Paiement',component: PaiementPage,visible: '0',
        sm:
        [
          {title: 'Paiements encaissés',component: PaiementPage, visiblity: '0'},
          {title: 'Paiements Effectués',component: PaiementPage, visiblity: '0'}
        ]
      },
      {icon: 'notifications', title: 'Notification',component: NotificationPage,visible: '0',sm:[]},
      {icon: 'person', title: 'Mon compte',component: ProfilPage,visible: '0' ,
        sm:
        [
          {title: 'Informations personnelles',component: ProfilPage, visiblity: '0'},
          {title: 'Preferences',component: ProfilPage, visiblity: '0'},
          {title: 'paiements',component: ProfilPage, visiblity: '0'}
        ]
      }
      //,
      //{icon: 'card', title: 'Tabs',component: TabsPage,visible: '1',sm:[]}

    ];

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.token = StorageUtils.getToken();
      FCMPlugin.getToken(
        (t) => {
          console.log(t);
          //this.showToast(t+' t');
        },
        (e) => {
          console.log(e);
           //this.showToast(e+' e');
        }
      );

      FCMPlugin.onNotification(
        (data) => {
          console.log(data);
        },
        (e) => {
          console.log(e);
        }
      );
      //this.initPushNotification();
    });
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
      }
    );
  }

  

  


  openPage(page) {
  // navigate to the new page if it is not the current page
    if(page.title=='Publier annonce' && this.token == null ){
      console.log('veuillez vous connecter')
      this.showToast('veuillez vous connecter');
    }else{
      this.menu.enable(true);
      this.nav.setRoot(page.component);
      this.menu.close();
      this.storage.set('name', page.title);

    }
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  }

  /*goDeposerAnnonce(page){
        this.navCtrl.push((page.component,{
        token: 'token',
        user: 'user'});
    
  }*/

  logout():void {
    StorageUtils.removeToken();
    StorageUtils.removeAccount();
    this.events.publish('user:lougout', 'logout');
    //this.menu.enable(false);
    this.nav.setRoot(TabsPage);
  }

  login(){
    let log:any;
    if(StorageUtils.getToken()==='undefined'){
      log = false;
       console.log(StorageUtils.getToken()+'false');
    }
    else{
      log = true;
       console.log(StorageUtils.getToken()+'true');
    }
    return log;
   
  }

  /*initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: "777537812079"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log("device token ->", data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message', data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.nav.push(NotificationPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.nav.push(NotificationPage, {message: data.message});
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }*/


}

