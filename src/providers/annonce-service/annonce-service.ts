import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
import {StorageUtils} from '../../Utils/storage.utils';

const CONTENT_TYPE_HEADER:string = 'Content-Type';

const APPLICATION_JSON:string = 'application/json';
//const BACKEND_URL:string = 'http://aims.avanquest.com/restau-prive/web/app_dev.php/';
const BACKEND_URL:string = 'http://213.246.59.111/restau-priv/web/app_dev.php/';
  const options = new RequestOptions({
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' +StorageUtils.getToken()
      })
    });

/*
  Generated class for the AnnonceServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AnnonceServiceProvider {
  base64Image:any;

  constructor(public http: Http, public camera:Camera) {
    console.log('Hello AnnonceServiceProvider Provider');
  }
  getLink(){
    let link:Array<any> = BACKEND_URL.split('web');
    return link[0]+'web/';
  }

  getLinkPhoto(){
    return BACKEND_URL;
  }
  

  lesAnnonces(){
  	return this.http.get(BACKEND_URL+'api/viewannonce?type=mobile').map((res:Response) => {

  	    let annonce:any = res.json();
  	    return annonce;
  	});
  }
  newReservation(annonceId,nb_convives){
    return this.http.get(BACKEND_URL+"api/newreservation"+"?annonce_id="+annonceId+"&nbConvives="+nb_convives, options).map((res:Response) => {

      let annonce:any = res.json();
      return annonce;
  });

  }

  categorieCuisine(){
    return this.http.get(BACKEND_URL+"api/catcuisine").map((res:Response) => {

      let annonce:any = res.json();
      return annonce;
  });

  }

  annonceComing(){
    
    return this.http.get(BACKEND_URL+'api/profil/annonce/coming?type=mobile', options).map((res:Response) => {
        let annonce:any = res.json();
        console.log(annonce);
        return annonce;
    });
  }

  annoncePast(){
    
    return this.http.get(BACKEND_URL+'api/profil/annonce/past?type=mobile', options).map((res:Response) => {
        let annonce:any = res.json();
        console.log(annonce);
        return annonce;
    });
  }

  annonceannule(){
    
    return this.http.get(BACKEND_URL+'api/profil/annonce/annulée?type=mobile', options).map((res:Response) => {
        let annonce:any = res.json();
        console.log(annonce);
        return annonce;
    });
  }

  reservationComing(){
  
    return this.http.get(BACKEND_URL+'api/profil/reservation/coming?type=mobile', options).map((res:Response) => {
        let reservation:any = res.json();
        console.log(reservation);
        return reservation;
    });
  }

  reservationPast(){
    return this.http.get(BACKEND_URL+'api/profil/reservation/past?type=mobile', options).map((res:Response) => {
        let reservation:any = res.json();
        console.log(reservation);
        return reservation;
    });
  }

  reservationAnnulee(){
    return this.http.get(BACKEND_URL+'api/profil/reservation/annulée?type=mobile', options).map((res:Response) => {
        let reservation:any = res.json();
        console.log(reservation);
        return reservation;
    });
  }

  avis(){
    
    return this.http.get(BACKEND_URL+'api/profil/annonce/avisannonce?type=mobile', options).map((res:Response) => {
        let reservation:any = res.json();
        console.log(reservation);
        return reservation;
    });
  }

  paiementEncaisses(){
  
    return this.http.get(BACKEND_URL+'api/profil/paiements/encaisses?type=mobile', options).map((res:Response) => {
        let paiement:any = res.json();
        console.log(paiement);
        return paiement;
    });
  }

  paiementEffectues(){
    
    return this.http.get(BACKEND_URL+'api/profil/paiements/effectues?type=mobile', options).map((res:Response) => {
        let paiement:any = res.json();
        console.log(paiement);
        return paiement;
    });
  }

  notification(){
  
    return this.http.get(BACKEND_URL+'api/profil/notification?type=mobile', options).map((res:Response) => {
        let paiement:any = res.json();
        console.log(paiement);
        return paiement;
    });
  }

  addPaiement(numerocarte,date,cvc,idreservation){
    
    return this.http.get(BACKEND_URL+"api/reservation/paiement/create"+"?numerocarte="+numerocarte+"&dateExpire="+date+"&cvc="+cvc+"&reservation_id="+idreservation+"&type="+"mobile", options).map((res:Response) => {

      let message:any = res.json();
      return message;
    });
  }

  addVirement(codeReservation, annonce_id){
    
    return this.http.get(BACKEND_URL+"api/virement/stripe/createvirement"+"?code_paiement="+codeReservation+"&annonce_id="+annonce_id+"&type="+"mobile", options).map((res:Response) => {

      let message:any = res.json();
      return message;
    });
  }

  newAnnonce(nomPlat,date,heuredebut,heurefin,lieu,photocouv,autrephoto,typecuisine,nbconvvesmin,nbconvivesmax,
  prix,details,typeannonce){
    
    return this.http.get(BACKEND_URL+"api/new-annonce"+"?nomPlat="+nomPlat+"&date="+date+"&heuredebut="+heuredebut+"&heurefin="+heurefin+"&lieu="+lieu+"&photocouv="+photocouv+"&autrephoto="+autrephoto+"&typecuisine="+typecuisine+"&nbconvvesmin="+nbconvvesmin+"&nbconvivesmax="+nbconvivesmax+"&prix="+prix+"&details="+details+"&typeannonce="+typeannonce, options).map((res:Response) => {

        let message:any = res.json();
        return message;
    });

  }

  validerReservation(reservation_id){
    
    console.log(BACKEND_URL+'api/reservation/valider/'+reservation_id+'?type=mobile', options);
    return this.http.get(BACKEND_URL+'api/reservation/valider/'+reservation_id+'?type=mobile', options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  declinerReservation(reservation_id){
    
    console.log(BACKEND_URL+'api/reservation/decliner/'+reservation_id+'?type=mobile');
    return this.http.get(BACKEND_URL+'api/reservation/decliner/'+reservation_id+'?type=mobile', options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  annulerReservation(annonce_id,reservation_id){
    
    console.log(BACKEND_URL+"api/reservation/"+annonce_id+"/annuler/"+reservation_id+"?type=mobile");
    return this.http.get(BACKEND_URL+"api/reservation/"+annonce_id+"/annuler/"+reservation_id+"?type=mobile", options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  rembourserReservation(reservation_id){
    
    console.log(BACKEND_URL+"api/remboursement/stripe/annulation/create/reservation/"+reservation_id+"?type=mobile");
    return this.http.get(BACKEND_URL+"api/remboursement/stripe/annulation/create/reservation/"+reservation_id+"?type=mobile", options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  annulerAnnonce(annonce_id){
    
    console.log(BACKEND_URL+'api/annonce/'+annonce_id+'/annuler?type=mobile');
    return this.http.get(BACKEND_URL+'api/annonce/'+annonce_id+'/annuler?type=mobile', options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  rembourserAnnulationAnnonce(annonce_id){
  
    console.log(BACKEND_URL+'api/remboursement/stripe/annulation/annonce/'+annonce_id+'?type=mobile');
    return this.http.get(BACKEND_URL+'api/remboursement/stripe/annulation/annonce/'+annonce_id+'?type=mobile', options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }
  modifierReservation(reservation_id,nbConvives){
    
    console.log(BACKEND_URL+'api/reservation/update/'+reservation_id+'?type=mobile&nbConvives='+nbConvives);
    return this.http.get(BACKEND_URL+'api/reservation/update/'+reservation_id+'?type=mobile&nbConvives='+nbConvives, options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  PaiemnetReservationApresModification(numerocarte, dateexpire,cvc,reservation_id, nombres_convives_ajoutes){
    
    console.log(BACKEND_URL+'api/reservation/paiement/update/'+reservation_id+'/'+nombres_convives_ajoutes+'?type=mobile&numerocarte='+numerocarte+'&dateExpire='+dateexpire+'&cvc='+cvc);
    return this.http.get(BACKEND_URL+'api/reservation/paiement/update/'+reservation_id+'/'+nombres_convives_ajoutes+'?type=mobile&numerocarte='+numerocarte+'&dateExpire='+dateexpire+'&cvc='+cvc, options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  remboursementReservationApresModification(numerocarte, dateexpire,cvc,reservation_id, nombres_convives_diminues){
    
    console.log(BACKEND_URL+'api/remboursement/stripe/update/'+reservation_id+'/'+nombres_convives_diminues+'?type=mobile&numerocarte='+numerocarte+'&dateExpire='+dateexpire+'&cvc='+cvc);
    return this.http.get(BACKEND_URL+'api/remboursement/stripe/update/'+reservation_id+'/'+nombres_convives_diminues+'?type=mobile&numerocarte='+numerocarte+'&dateExpire='+dateexpire+'&cvc='+cvc, options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  createAvis(annonce_id,cuisine,conviviabilite,ambiance,prix,avis){
    
    return this.http.get(BACKEND_URL+'api/note/annonce/'+annonce_id+'/create?type=mobile&cuisine='+cuisine+'&conviviabilite='+conviviabilite+'&ambiance='+ambiance+'&prix='+prix+'&avis='+avis, options).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }


  createPostAvis(annonce_id,cuisine,conviviabilite,ambiance,prix,avis){
    
    return this.http.post(BACKEND_URL+'api/note/annonce/'+annonce_id+'/create',JSON.stringify({"cuisine":cuisine, "conviviabilite":conviviabilite,"ambiance":ambiance,"prix":prix,"avis":avis})).map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  rechercheAnnonce(plat,lieu){
    
    console.log(BACKEND_URL+'api/recherche/annonce?type=mobile&plat='+plat+'&lieu='+lieu);
    return this.http.get(BACKEND_URL+'api/recherche/annonce?type=mobile&plat='+plat+'&lieu='+lieu)
    .map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });
  }

  commentaireAnnonce(annonce_id,body){
    
    console.log(BACKEND_URL+'api/annonce/'+annonce_id+'/comments?type=mobile&body='+body);
    return this.http.get(BACKEND_URL+'api/annonce/'+annonce_id+'/comments?type=mobile&body='+body, options)
    .map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });

  }

  replyCommentaireAnnonce(annonce_id,body,parentId){
    
    console.log(BACKEND_URL+'api/annonce/'+annonce_id+'/comments?type=mobile&body='+body+'&parentId='+parentId);
    return this.http.get(BACKEND_URL+'api/annonce/'+annonce_id+'/comments?type=mobile&body='+body+'&parentId='+parentId, options)
    .map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });

  }

  getCommentaireAnnonce(annonce_id){

    console.log(BACKEND_URL+'api/annonce/commentaires/'+annonce_id+'?permalink='+BACKEND_URL+'/annonce/'+annonce_id);

    return this.http.get(BACKEND_URL+'api/annonce/commentaires/'+annonce_id+'?permalink='+BACKEND_URL+'/annonce/'+annonce_id, options)
    .map((res:Response) => {
        let data:any = res.json();
        console.log(data);
        return data;
    });

  }

  takeThePhoto() {
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.FILE_URI,
            quality: 50,
            targetWidth: 720,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        })
        .then(
        imageURI => {
            window['plugins'].crop.promise(imageURI, {
                quality: 75
            }).then(newPath => {
                    return this.toBase64(newPath).then((base64Img) => {
                        this.base64Image = base64Img;
                        this.base64Image = this.resize(this.base64Image, 250, 250);
                    });
                },
                error => {
                    console.log("CROP ERROR -> " + JSON.stringify(error));
                    alert("CROP ERROR: " + JSON.stringify(error));
                }
                );
        },
        error => {
            console.log("CAMERA ERROR -> " + JSON.stringify(error));
            alert("CAMERA ERROR: " + JSON.stringify(error));
        }
        );
    }

    toBase64(url: string) {
        return new Promise<string>(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }

    resize(base64Img, width, height) {
        var img = new Image();
        img.src = base64Img;
        var canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg");
    }

}
