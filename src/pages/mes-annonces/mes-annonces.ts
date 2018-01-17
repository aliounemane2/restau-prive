import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { Storage } from '@ionic/storage';
import { ViewAnnoncePage } from '../view-annonce/view-annonce';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the MesAnnoncesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html',
})
export class MesAnnoncesPage {
annonces: Array<any>;
menu: any;
parent: any;
link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController, public storage: Storage,private alertCtrl: AlertController,public viewCtrl: ViewController, public connectivityService:ConnectivityServiceProvider) {
   	this.storage.get('name').then((val) => {
      console.log('Your name is', val);
      this.menu = val;
    })
    this.parent='my-annonce';
    this.link = this.annonceService.getLink();
    console.log(this.link);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesAnnoncesPage');
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
  	});

  	loader.present().then(() => {
  	if(this.menu == 'Annonces à venir'){
  		this.annonceService.annonceComing().subscribe(
		      data => {
		          this.annonces = data.annonces; 
		          if(this.annonces.length == 0){
                let titre ="Pas d'annonce à venir"
                this.presentPromptOk(titre);
                console.log(this.annonces+' 1');

              }
              else{
                console.log(this.annonces);
                
              }
		      },
		      err => {
		          console.log(err);
              console.log(err._body.error);
              loader.dismiss();
              let titre ="Une erreur est survenue reessayer plus tard ";
              this.presentPromptOk(titre);
		      },
		      () => {loader.dismiss()}
		  );
  	}

  	else if(this.menu == 'Annonces passées'){
  		this.annonceService.annoncePast().subscribe(
		      data => {
		          this.annonces = data.annonces; 
		          if(this.annonces.length == 0){
              let titre ="Pas d'annonce passée"
                this.presentPromptOk(titre);
              
                console.log(this.annonces+' 1');

              }
              else{
                console.log(this.annonces);
                
              }
		      },
		      err => {
		          console.log(err);
              loader.dismiss();
              let titre ="Une erreur est survenue reessayer plus tard ";
              this.presentPromptOk(titre);
		      },
		      () => {loader.dismiss()}
		  );
  	}

  	else if(this.menu == 'Annonces annulées'){
  		this.annonceService.annonceannule().subscribe(
		      data => {
		          this.annonces = data.annonces; 
		          console.log(this.annonces);
              if(this.annonces.length == 0){
                let titre ="Pas d'annonce annulée";
                this.presentPromptOk(titre);

                console.log(this.annonces+' 1');

              }
              else{
                console.log(this.annonces);
                
              }
		      },
		      err => {
		          console.log(err);
              loader.dismiss();
              let titre ="Une erreur est survenue reessayer plus tard ";
              this.presentPromptOk(titre);
		      },
		      () => {loader.dismiss()}
		  );
  	}
    else{
      this.storage.set('name', 'Annonces à venir');
      this.storage.get('name').then((val) => {
        console.log('Your name is', val);
        this.menu = val;
      })
      this.annonceService.annonceComing().subscribe(
          data => {
              this.annonces = data.annonces; 
              if(this.annonces.length == 0){
                let titre ="Pas d'annonce à venir"
                this.presentPromptOk(titre);
                console.log(this.annonces+' 1');

              }
              else{
                console.log(this.annonces);
                
              }
          },
          err => {
              console.log(err);
              console.log(err._body.error);
              loader.dismiss();
              let titre ="Une erreur est survenue reessayer plus tard ";
              this.presentPromptOk(titre);
          },
          () => {loader.dismiss()}
      );

    }
		  
	});
  }

  itemTapped(event, annonce, parent) { 
        this.navCtrl.push(ViewAnnoncePage, {
            'annonce': annonce,
            'parent' : parent
        });
  }

  presentPromptOk(titre) {
    let alert = this.alertCtrl.create({
      title: titre,
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
