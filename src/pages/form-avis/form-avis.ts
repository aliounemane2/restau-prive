import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {StorageUtils} from '../../Utils/storage.utils';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

/**
 * Generated class for the FormAvisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-form-avis',
  templateUrl: 'form-avis.html',
})
export class FormAvisPage {
	myFormulaire: FormGroup;
	reservation : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController, public formBuilder: FormBuilder, public toast : Toast, public connectivityService:ConnectivityServiceProvider) {
   	this.myFormulaire = formBuilder.group({
      cuisine: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'), Validators.required])],
      conviviabilite: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'), Validators.required])],
      ambiance: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'), Validators.required])],
      prix: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'), Validators.required])],
      avis: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
    });

    if(navParams.get("reservation") !== "undefined")
  	{
  	  this.reservation = navParams.get("reservation");
  	  console.log(this.reservation);
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormAvisPage');
  }

  newAvis(){ 
    if(!this.myFormulaire.valid){
      console.log("Remplissez tous les champs!");
      this.showToast("Remplissez tous les champs!");
    }
    else{
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });
    loader.present().then(() => {
    var json = this.myFormulaire.value;
    this.annonceService.createAvis(this.reservation.annonce.id, json.cuisine,json.conviviabilite,json.ambiance,json.prix,json.avis).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Reservation';
          let message: any =data.messages;
          this.showToast(message);
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
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
