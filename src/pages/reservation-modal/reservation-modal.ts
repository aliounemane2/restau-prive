import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,Platform, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import {Toast} from 'ionic-native';
import { NewPaiementPage } from '../new-paiement/new-paiement';


declare var window: any;

/**
 * Generated class for the ReservationModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reservation-modal',
  templateUrl: 'reservation-modal.html',
})
export class ReservationModalPage {

  annonce: any = this.navParams.get('annonce');
  reservation: any = this.navParams.get('reservation');
  parent: any = this.navParams.get('parent') ;
  titre : any = this.navParams.get('titre') ;
  nb_places_restantes : any;
  nbConvives : any;
  myFormulaire: FormGroup;
  parente : any;
  paiement : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
   public annonceService:AnnonceServiceProvider, public formBuilder: FormBuilder, public alertCtrl: AlertController,private platform: Platform, public loading: LoadingController) {
   console.log(this.annonce);
   console.log(this.reservation);
   console.log(this.parent);

  let chaine : any ="";
  let conv : any =0;
  if(this.parent=='viewannonce'){
    for (let i=0; i < this.annonce.places_restantes; i++) 
    {
      this.nbConvives=[i+1];
      conv = i+1;
      chaine=chaine+conv+",";
    }
  }

  if(this.parent=='detailsreservation'){
  this.nb_places_restantes = this.reservation.nb_convives + this.reservation.annonce.places_restantes ;

    for (let i=0; i < this.nb_places_restantes; i++) 
    {
      this.nbConvives=[i+1];
      conv = i+1;
      chaine=chaine+conv+",";
    }
  }
    

  
    this.nbConvives = chaine.split(",");
    console.log(this.nbConvives);

    this.myFormulaire = formBuilder.group({
      nbcon: ['']

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  alertBox(titre,sousTitre,message){
    var alert = this.alertCtrl.create({
      title: titre,
      subTitle: sousTitre,
      message: message,
      buttons: ["close"]
    });

  }
  goToNewPaiement(donnees,parent){
  this.navCtrl.push(NewPaiementPage,{
        'reservation': donnees,
        'parent' : parent});
  }

  goToEditPaiement(donnees,parent){
  this.navCtrl.push(NewPaiementPage,{
        'paiement': donnees,
        'parent' : parent});
  }

  addReservation(){
    var json = this.myFormulaire.value;
     
    if(json.nbcon !=''){
      let loader = this.loading.create({
      content: 'Chargement en cours...',
      });
      loader.present().then(() => {
        this.annonceService.newReservation(this.annonce.id,json.nbcon).subscribe(
        data => {
        this.parente = 'newreservation';
          console.log(data.entity);
          this.goToNewPaiement(data.entity,this.parente );
          this.viewCtrl.dismiss();
        },
        err => {
          console.log(err);
        },
        () => {loader.dismiss()}
        );
        this.viewCtrl.dismiss();
      });
      
    }
    else
    {
      //let titre: any='Message';
      //let sousTitre: any= 'Reservation';
      let message: any ='Selectionnez un element dans la liste';
      //this.alertBox(titre,sousTitre,message);
      //this.showToast1(message, 'center');
      console.log('Selectionnez un element dans la liste');
    }
   
  }

  modifierReservation()
  { 
    var json = this.myFormulaire.value;
    if(json.nbcon !='')
    {
      let loader = this.loading.create({
      content: 'Chargement en cours...',
      });
      loader.present().then(() => {
        this.annonceService.modifierReservation(this.reservation.id,json.nbcon).subscribe(
          data => {
            console.log(data);
            this.parente = 'updatereservation';
            this.paiement = data;
           this.goToEditPaiement(this.paiement,this.parente);

            let titre: any='Message';
            let sousTitre: any= 'Validation reservation';
            let message: any =data.message;
            //this.alertBox(titre,sousTitre,message);
          },
          err => {
            console.log(err);
          },
          ()  => {loader.dismiss()}
        );
      });

    } 
    else{
      console.log('Selectionnez un element dans la liste');
    }
  }

  showToast(message, position) {
        this.platform.ready().then(() => {
            window.plugins.toast.show(message, "short", position);
        });
    }

    showToast1(message, position) {
    Toast.show(message, "short", position).subscribe(
        toast => {
            console.log(toast);
        }
      );
    }

}
