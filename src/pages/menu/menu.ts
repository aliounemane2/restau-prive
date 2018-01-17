import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,Platform, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { NewPaiementPage } from '../new-paiement/new-paiement';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';


/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  annonce: any ;
  reservation: any ;
  parent: any ;
  titre : any  ;
  nb_places_restantes : any;
  nbConvives : any;
  myFormulaire: FormGroup;
  parente : any;
  paiement : any;
  link : any;

  private rootPage;
  private homePage;
  private LoginPage;
  private AProposPage;
  private UserRegisterPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
   public annonceService:AnnonceServiceProvider, public formBuilder: FormBuilder, public alertCtrl: AlertController,private platform: Platform, public loading: LoadingController,public toast : Toast, public connectivityService:ConnectivityServiceProvider) {

  
  this.annonce = this.navParams.get('annonce');
  this.reservation = this.navParams.get('reservation');
  this.parent = this.navParams.get('parent') ;
  this.titre  = this.navParams.get('titre') ;

  this.link = this.annonceService.getLink();
  console.log(this.link);

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
    console.log('ionViewDidLoad MenuPage');
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
      this.connectivityService.checkNetwork();
      let loader = this.loading.create({
      content: 'Chargement en cours...',
      });
      loader.present().then(() => {
        this.annonceService.newReservation(this.annonce.id,json.nbcon).subscribe(
        data => {
        this.parente = 'newreservation';
          console.log(data.entity);
          this.showToast1('Reservation effectuée avec succés');
          this.goToNewPaiement(data.entity,this.parente );
          //this.viewCtrl.dismiss();
        },
        err => {
          console.log(err);
        },
        () => {loader.dismiss()}
        );
        //this.viewCtrl.dismiss();
      });
      
    }
    else
    {
      
      let message: any ='Selectionnez un element dans la liste';
      this.showToast1(message);
      console.log('Selectionnez un element dans la liste');
    }
   
  }

  modifierReservation()
  { 
    var json = this.myFormulaire.value;
    if(json.nbcon !='')
    {
      this.connectivityService.checkNetwork();
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
            //window.plugins.toast.show(message, "short", position);
        });
    }

    showToast1(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
