import { Component } from '@angular/core';
import { NavController, Alert, Events } from 'ionic-angular';
import { UserRegisterPage } from '../user-register/user-register';
import { LoginPage } from '../login/login';
import { ListeAnnoncePage } from '../liste-annonce/liste-annonce';
import {StorageUtils} from '../../Utils/storage.utils';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { DeposerUneannoncePage } from '../deposer-uneannonce/deposer-uneannonce';
import { ProfilPage } from '../profil/profil';
import { AProposPage } from '../a-propos/a-propos';
import { Toast } from '@ionic-native/toast';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token : any
  

  constructor(public navCtrl: NavController, public annonceService:AnnonceServiceProvider, private events: Events,public toast: Toast, public connectivityService:ConnectivityServiceProvider) {
    this.token = StorageUtils.getToken();
    events.subscribe('user:home', (userEventData) => {
      this.token = StorageUtils.getToken();
      console.log(this.token);
    });

  }

  
  
   


  seConnecter(){
        this.navCtrl.push(LoginPage,{
        latt: 'this.latitud',
        lngg: 'this.longitud'}); 
  }

  sInscrire(){
        this.navCtrl.push(UserRegisterPage,{
        latt: 'this.latitud',
        lngg: 'this.longitud'});
    
  }

  deposerAnnonce(){
  this.token = StorageUtils.getToken();
   console.log(this.token);

  if(this.token != null){
      console.log('ok');
      this.navCtrl.push(DeposerUneannoncePage,{
      latt: 'this.latitud',
      lngg: 'this.longitud'});
   }
   if(this.token ==null){
      this.showToast('Veuillez vous connecter');
      console.log('Veuillez vous connecter');     
   }
  }

  decouvrirRestauPrive(){
    

  }
  restauPrive(){
    this.navCtrl.push(AProposPage,{
      latt: 'this.latitud',
      lngg: 'this.longitud'});
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
      }
    );
  }

}
