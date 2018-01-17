import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the VirementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-virement',
  templateUrl: 'virement.html',
})
export class VirementPage {

   myFormulaire: FormGroup;
   annonce :any;
   montant : any;
   frais : any;
   total :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder, public loading: LoadingController, public annonceService:AnnonceServiceProvider,private alertCtrl: AlertController,public toast: Toast, public connectivityService:ConnectivityServiceProvider) {
  	this.myFormulaire = formBuilder.group({
  		code_paiement: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
  	})

  	if(navParams.get("annonce") !== "undefined"){
        this.annonce = navParams.get("annonce");        
    }
  }

  showToast(titre)
  {
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VirementPage');
    //this.newVirement();
  }

  newVirement(){ 
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
      this.showToast("Remplissez tous les champs!");
    }
    else{
    this.connectivityService.checkNetwork();
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });
    loader.present().then(() => {
    var json = this.myFormulaire.value;
    this.annonceService.addVirement(json.code_paiement, this.annonce.id).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Virement';
          let message: any =data.message;
          this.alertBox(titre,sousTitre,message);
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

  alertBox(titre,sousTitre,message){
    var alert = this.alertCtrl.create({
      title: titre,
      subTitle: sousTitre,
      message: message,
      buttons: ["close"]
    });
    alert.present();
  }

}
