import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { ResultRecherchePage } from '../result-recherche/result-recherche';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';



/**
 * Generated class for the RecherchePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html',
})
export class RecherchePage {
myFormulaire: FormGroup;
catCuisine: Array<any>;
annonces: Array<any>;
link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController ,private alertCtrl: AlertController, public toast: Toast, public connectivityService:ConnectivityServiceProvider) {
  	this.myFormulaire = formBuilder.group({
  		lieu: [''],
      	plat: [''],
      	myDate: [''],
      	prix: [''],
      	heure: [''],
      	typecuisine: ['']
  	});
    this.link = this.annonceService.getLink();
    console.log(this.link);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecherchePage');
    //this.getcategorieCuisine();
  }

  getcategorieCuisine(){
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
      content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      this.annonceService.categorieCuisine().subscribe(
      data => {
        console.log(data);
        this.catCuisine = data.catcuisine;
      },
      err => {
        console.log(err);
      },
      () => {loader.dismiss()}
      //() => console.log('')
      );

    });
  }
  rechercheAnnonce(){
    this.connectivityService.checkNetwork();
  	let loader = this.loading.create({
      content: 'Chargement en cours...',
    });

    loader.present().then(() => {
      var json = this.myFormulaire.value;
      this.annonceService.rechercheAnnonce(json.plat,json.lieu).subscribe(
      data => {
        console.log(data);
        this.annonces = data.annonces;
        if(this.annonces.length == 0){
          console.log('No data found');
          let titre = "Pas de résultats trouvés"
          this.presentPromptOk(titre);
        }
        else{
          this.goToResultRecherche(this.annonces,this.link);
        }
        
      },
      err => {
        console.log(err);
        loader.dismiss();
      },
      () => {loader.dismiss()}
      //() => console.log('')
      );

    });

  }

  goToResultRecherche(annonce,link){
    this.navCtrl.push(ResultRecherchePage,{
      'annonce': annonce,
      'link': link});
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
          }
        }
      ]
    });
    alert.present();
  }

}
