import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the NewPaiementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-paiement',
  templateUrl: 'new-paiement.html',
})
export class NewPaiementPage {
   myFormulaire: FormGroup;
   reservation :any;
   paiement : any;
   montant : any;
   frais : any;
   total :any;
   parent : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder, public loading: LoadingController, public annonceService:AnnonceServiceProvider,private alertCtrl: AlertController,public toast : Toast, public connectivityService:ConnectivityServiceProvider) {
  	this.myFormulaire = formBuilder.group({
  		numerocarte: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
    	dateExpire: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
    	cvc: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'),Validators.required])]
  	})


    if(navParams.get("parent")=='newreservation'){
      if(navParams.get("reservation") !== "undefined" && navParams.get("parent") !== "undefined" ){
          this.reservation = navParams.get("reservation");
          this.parent = navParams.get("parent"); 
          console.log(this.reservation);
          console.log(this.parent);
          this.montant = this.reservation.nb_convives * this.reservation.annonce.prix;
          this.frais = this.montant / 5;
          this.total = this.montant + this.frais;
          console.log(this.montant+ " "+this.frais);
          
      }
    }
  	
    if(navParams.get("parent")=='updatereservation'){
      if(navParams.get("paiement") !== "undefined" && navParams.get("parent") !== "undefined" ){
        this.paiement = navParams.get("paiement");
        this.parent = navParams.get("parent"); 
        console.log(this.paiement);
        console.log(this.parent);
      }
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPaiementPage');
    //this.newPaiement();
  }

  addPaiement(){
    var json = this.myFormulaire.value;
    console.log(json);

  }

  newPaiement(){ 
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
    this.annonceService.addPaiement(json.numerocarte,json.dateExpire,json.cvc,this.reservation.id).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Paiement';
          let message: any =data.message;
          //this.alertBox(titre,sousTitre,message);
          this.showToast(data.message);
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

  modifierPaiement(){
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
    this.annonceService.PaiemnetReservationApresModification(json.numerocarte,json.dateExpire,json.cvc,this.paiement.reservation_id,this.paiement.nombres_convives_ajoutes).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Paiement';
          let message: any =data.message;
          this.alertBox(titre,sousTitre,message);
        },
        err => {
          console.log(err);
          loader.dismiss();
          this.showToast("Une erreur s'est produite Reessayer plus tard");
        },
        ()  => {loader.dismiss()}
        );

    });
    
    }
  }


  rembourserPaiement(){
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
    this.annonceService.remboursementReservationApresModification(json.numerocarte,json.dateExpire,json.cvc,this.paiement.reservation_id,this.paiement.nombres_convives_diminues).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Paiement';
          let message: any =data.message;
          this.alertBox(titre,sousTitre,message);
        },
        err => {
          console.log(err);
          loader.dismiss();
          this.showToast("Une erreur s'est produite Reessayer plus tard");
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

  }

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
