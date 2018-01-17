import { Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
//const BACKEND_URL:string = 'https://aims.avanquest.com/restau-priv/web/app_dev.php/';

const APPLICATION_JSON:string = 'application/json';

/*
  Generated class for the DataServicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataServicesProvider {

  constructor(private alertCtrl: AlertController,private http:Http) {
    console.log('Hello DataServicesProvider Provider');
  }

  /*addAnnonce(nomPlat,date,heuredebut,heurefin,lieu,photocouv,autrephoto,typecuisine,nbconvvesmin,nbconvivesmax,
  prix,details) {
  //let headers = new Headers();
  //headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
  var link= "https://aims.avanquest.com/restau-priv/web/app_dev.php/api/new-annonce?nomPlat="+nomPlat+"&date="+date+"&heuredebut="+heuredebut+"&heurefin="+heurefin+"&lieu="+lieu+"&photocouv="+photocouv+"&autrephoto="+autrephoto+
    "&typecuisine="+typecuisine+"&nbconvvesmin="+nbconvvesmin+"&nbconvivesmax="+nbconvivesmax+"&prix="+prix+"&details="+details;
  console.log(link);
    this.http.get("https://aims.avanquest.com/restau-priv/web/app_dev.php/api/new-annonce?nomPlat="+nomPlat+"&date="+date+"&heuredebut="+heuredebut+"&heurefin="+heurefin+"&lieu="+lieu+"&photocouv="+photocouv+"&autrephoto="+autrephoto+
    "&typecuisine="+typecuisine+"&nbconvvesmin="+nbconvvesmin+"&nbconvivesmax="+nbconvivesmax+"&prix="+prix+"&details="+details)
      .subscribe(data => {
        var alert = this.alertCtrl.create({
          title: "Message",
          subTitle: data.json().origin,
          message: data.json().messages,
          buttons: ["close"]
        });

        alert.present();
        
        this.navCtrl.push(ListeAnnoncePage,{
        latt: 'this.latitud',
        lngg: 'this.longitud'});
  
        //this.emptyField;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  newReservation(annonceId,nb_convives){
  let headers = new Headers();
  headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
    return this.http.get(BACKEND_URL+"api/newreservation"+"?annonce_id="+annonceId+"&nbConvives="+nb_convives).map((res:Response) => {

      let annonce:any = res.json();
      return annonce;
  });

  }*/
}