import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController, ViewController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { DetailsNotificationPage } from '../details-notification/details-notification';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
   notifications: Array<any>;

	pushMessage: string = "push message will be displayed here";

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController,private alertCtrl: AlertController,public viewCtrl: ViewController, public connectivityService:ConnectivityServiceProvider) {

   if (navParams.data.message) {
      this.pushMessage = navParams.data.message;
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {

      this.annonceService.notification().subscribe(
          data => {
              this.notifications = data.notifications;
              if(this.notifications.length == 0){
                this.presentPromptOk();
                console.log(this.notifications);

              }
              else{
                console.log('notifications');
                
              } 
          },
          err => {
              console.log(err);
              loader.dismiss();
              this.presentPromptOk();
          },
          () => {loader.dismiss()}
      );
    });
  }

  itemTapped(event, notification) { 
        this.navCtrl.push(DetailsNotificationPage, {
            'notification': notification
        });
    }

  presentPromptOk() {
    let alert = this.alertCtrl.create({
      title: 'Pas de nouvelle notification',
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
