import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController} from 'ionic-angular';
import { ReservationModalPage } from '../reservation-modal/reservation-modal';
import {StorageUtils} from '../../Utils/storage.utils';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';




/**
 * Generated class for the ViewAnnoncePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-annonce',
  templateUrl: 'view-annonce.html',
})
export class ViewAnnoncePage {
	annonce :any;
  token : any;
  parent : any;
  myFormulaire: FormGroup;
  comment: any;
  user : any;
  value: any;
  link: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public annonceService:AnnonceServiceProvider, public loading: LoadingController,public formBuilder: FormBuilder,public alertCtrl: AlertController,private toast : Toast, public connectivityService:ConnectivityServiceProvider) {
  	if(navParams.get("annonce") !== "undefined" && navParams.get("parent") !== "undefined" ){
        this.annonce = navParams.get("annonce");
        this.parent = navParams.get("parent");
        console.log(this.annonce);
        console.log(this.parent);  
        this.token = StorageUtils.getToken();
        this.user = StorageUtils.getAccount();
        this.value =0;
        this.link = this.annonceService.getLink();
        console.log(this.link);
    }

    this.myFormulaire = formBuilder.group({
          body: ['', Validators.compose([Validators.maxLength(150), Validators.required])]
    });
  }

  openModal() {
    this.token = StorageUtils.getToken();
    console.log(this.token);
    if(this.token != null){
      let annonceR = {'annonce': this.annonce,'parent' :  'viewannonce','titre': 'Nouvelle reservation'};
      let myModal = this.modalCtrl.create(ReservationModalPage,annonceR);
      console.log(annonceR);
      myModal.present();
    }
    else{
      console.log('Veuillez vous connecter');     

    }
    
  }

  goToMenureservation(){
    
    console.log(this.token);
    console.log(this.user);
    if(this.token != null){
      if(this.user.id == this.annonce.user.id){
        console.log('Vous ne pouvez pas faire une reservation sur votre propre annonce');  
        this.showToast('Vous ne pouvez pas faire une reservation sur votre propre annonce');
      }
      else{
        let annonceR = {'annonce': this.annonce,'parent' :  'viewannonce','titre': 'Nouvelle reservation'};
      //let myModal = this.modalCtrl.create(ReservationModalPage,annonceR);
        this.navCtrl.push(MenuPage, {
            'annonce': this.annonce,
            'parent' :  'viewannonce',
            'titre': 'Nouvelle reservation'
        })
      }
      
      }else
      {
        console.log('Veuillez vous connecter'); 
        this.showToast('Veuillez vous connecter');
      }
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAnnoncePage');
    console.log(this.token);
    if(this.token != null){
      this.getCommentaire();
    }
    
  }

  annulerAnnonce()
  { 
    this.connectivityService.checkNetwork();
    console.log('aa');
    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });
    loader.present().then(() => {
    this.annonceService.annulerAnnonce(this.annonce.id).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Annulation annonce';
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

  commentaireAnnonce(){
    if(!this.myFormulaire.valid){
      console.log("Remplissez tous les champs!");
      this.showToast("Remplissez tous les champs!");
    }
    else{
    var json = this.myFormulaire.value;
    this.connectivityService.checkNetwork();
      console.log('oo');
      let loader = this.loading.create({
      content: 'Chargement en cours...',
      });
      loader.present().then(() => {
        this.annonceService.commentaireAnnonce(this.annonce.id,json.body).subscribe(
          data => {
            console.log(data);

            let titre: any='Message';
            let sousTitre: any= 'Commentaire';
            let message: any =data.messages;
            this.value = 0;
            //this.getCommentaire();
            this.annonceService.getCommentaireAnnonce(this.annonce.id).subscribe(
              data => {
                  this.comment = data.comments; 
                  console.log(this.comment);
                  
              },
              err => {
                  console.log(err);
                  this.showToast("une erreur s'est produite reessayer plus tard");
              }             
          ); 
           // this.showToast(data.messages);
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

  getCommentaire(){
    console.log('ionViewDidLoad ListeAnnoncePage');
    this.connectivityService.checkNetwork();
    console.log('bb');

    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });

    loader.present().then(() => {

      this.annonceService.getCommentaireAnnonce(this.annonce.id).subscribe(
          data => {
              this.comment = data.comments; 
              console.log(this.comment);
              
          },
          err => {
              console.log(err);
              loader.dismiss();
              this.showToast("une erreur s'est produite reessayer plus tard");
          },
          
          () => {loader.dismiss()}
         
      );  
    });
  }

  replyCommentaireAnnonce(body,parent_id){
    this.connectivityService.checkNetwork();
    console.log('cc');
    let loader = this.loading.create({
      content: 'Chargement en cours...',
      });
      loader.present().then(() => {
        this.annonceService.replyCommentaireAnnonce(this.annonce.id,body,parent_id).subscribe(
          data => {
            console.log(data);

            let titre: any='Message';
            let sousTitre: any= 'Commentaire';
            let message: any =data.messages;
            this.annonceService.getCommentaireAnnonce(this.annonce.id).subscribe(
              data => {
                  this.comment = data.comments; 
                  console.log(this.comment);
                  
              },
              err => {
                  console.log(err);
                  this.showToast("une erreur s'est produite reessayer plus tard");
              }             
          );
            
          },
          err => {
            console.log(err);
            loader.dismiss();
            this.showToast("Une erreur s'est produite");
          },
          ()  => {loader.dismiss()}
          );
      });
  }



  showPrompt(parent_id) {
    let prompt = this.alertCtrl.create({
      title: 'Commentaire',
      message: "repondre a ce commentaire",
      inputs: [
        {
          name: 'title',
          placeholder: 'Commentaire'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enregistrer',
          handler: data => {
            console.log(data);
            if(data.title == ""){
              console.log('Ne peut pas etre vide');
              this.showToast("Le champ ne peut pas etre vide");
            }
            else{
              this.replyCommentaireAnnonce(data.title,parent_id);
            }
            
          }
        }
      ]
    });
    prompt.present();
  }
  AfficherChampCommentaire(){
    this.value = 1;
    console.log(this.value);
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
