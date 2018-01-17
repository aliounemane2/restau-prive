import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ModalController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http} from '@angular/http';
import { DataServicesProvider } from '../../providers/data-services/data-services';
import {StorageUtils} from '../../Utils/storage.utils';
import { AnnonceServiceProvider } from '../../providers/annonce-service/annonce-service';
import { Camera } from '@ionic-native/camera';
import {LoadingModalComponent} from '../../components/loading-modal/loading-modal';
import { Toast } from '@ionic-native/toast';
import { TabsPage } from '../tabs/tabs';
import { MesAnnoncesPage } from '../mes-annonces/mes-annonces';
import { Storage } from '@ionic/storage';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

declare var plugins: any;
declare var google;

/**
 * Generated class for the DeposerUneannoncePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-deposer-uneannonce',
  templateUrl: 'deposer-uneannonce.html',
})
export class DeposerUneannoncePage {
  submitAttempt: boolean = false;

  myFormulaire: FormGroup;
   public token;
   public user;
   catCuisine: Array<any>;
   base64Image:any;
   value: any;
   val : any;
   sever : any;
   public options: any ;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,private http:Http,private alertCtrl: AlertController, public DataService: DataServicesProvider,
   public annonceService:AnnonceServiceProvider, public loading: LoadingController, public camera:Camera,private modalCtrl: ModalController, private toast : Toast,public viewCtrl: ViewController, public storage : Storage, public connectivityService:ConnectivityServiceProvider,private transfer: Transfer) {
  this.myFormulaire = formBuilder.group({
      nomplat: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      myDate: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      heuredebut: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      heurefin: ['',Validators.compose([Validators.maxLength(30), Validators.required])],
      lieu: ['', Validators.compose([Validators.maxLength(100), Validators.
      required])],
      photocouv: [''],
      autrephoto: ['', ],
      typecuisine: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      nbconvivesmin: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'), Validators.required])],
      nbconvivesmax: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'), Validators.required])],
      prix: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'), Validators.required])],
      details: ['', Validators.compose([Validators.maxLength(150), Validators.required])],
      typeannonce: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
    });
    this.val = 0;
    this.sever = this.annonceService.getLinkPhoto();

    if(navParams.get("token") !== "undefined" && navParams.get("user") !== "undefined" ){
        this.token = navParams.get("token");
        this.user = navParams.get("user");
        //console.log(this.token+" ppppp "+this.user.id);
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeposerUneannoncePage');
    this.getcategorieCuisine();
  }

  showAddressModal () {
    console.log('petit dej');
    let modal = this.modalCtrl.create(LoadingModalComponent);
    let me = this;
    modal.onDidDismiss(data => {
      this.myFormulaire.controls['lieu'].setValue(data);
    });
    modal.present();
  }

  /*saveAnnonce(){
    this.submitAttempt = true;
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
    }
    else {
      //this.checkNetwork();
      var json = this.myFormulaire.value;
      console.log(this.myFormulaire.value);
      this.DataService.addAnnonce(json.nomplat,json.myDate,json.heuredebut,json.heurefin,json.lieu,json.photocouv,json.autrephoto,json.typecuisine,json.nbconvivesmin,json.nbconvivesmax,json.prix,json.details); 
    }
  }*/



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
        loader.dismiss();
      },
      () => {loader.dismiss()}
      //() => console.log('')
      );

    });
  }


  newAnnonce(){ 
    if(!this.myFormulaire.valid){
      console.log("remplissez tous les champs!");
      this.showToast("remplissez tous les champs!");
    }
    else{
    this.connectivityService.checkNetwork();

    let loader = this.loading.create({
    content: 'Chargement en cours...',
    });
    loader.present().then(() => {
    var json = this.myFormulaire.value;
    this.upload();
    this.annonceService.newAnnonce(json.nomplat,json.myDate,json.heuredebut,json.heurefin,json.lieu,'photo.jpg',json.autrephoto,json.typecuisine,json.nbconvivesmin,json.nbconvivesmax,json.prix,json.details,json.typeannonce).subscribe(
        data => {
          console.log(data);

          let titre: any='Message';
          let sousTitre: any= 'Reservation';
          let message: any =data.messages;
          this.alertBox(titre,sousTitre,message);
          if(data.message=='ok'){
            this.presentPromptOk(data.messages)

          }
          else{
            console.log(data.messages);
            this.showToast(data.messages);
          }
        },
        err => {
          console.log(err);
          loader.dismiss();
          this.showToast("Une erreur est survenue ressayer plus tard");
        },
        ()  => {loader.dismiss()}
        );

    });
    
    }
  }

  presentPromptOk(titre) {
    let alert = this.alertCtrl.create({
      title: titre,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            this.storage.set('name', 'Annonces à venir');
            this.navCtrl.push(MesAnnoncesPage, {
            'notification': 'notification'
            });
          }
        }
      ]
    });
    alert.present();
  }

  showToast(titre){
    this.toast.show(titre, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  alertBox(titre,sousTitre,message){
    var alert = this.alertCtrl.create({
      title: titre,
      subTitle: sousTitre,
      message: message,
      buttons: ["close"]
    });

  }

  ionViewWillEnter() {
      // Google Places API auto complete
     let input = document.getElementById('lieu').getElementsByTagName('input')[1];
     let autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
     google.maps.event.addListener(autocomplete, 'place_changed', () => {
       // retrieve the place object for your use
       let place = autocomplete.getPlace();
       console.log(place);
     });
    }

  getPicture(){
    this.options= {
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.FILE_URI
      };
    this.camera.getPicture(this.options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
        plugins.crop(function success () {
        this.myFormulaire.controls['photocouv'].setValue(this.base64Image);
        console.log('ok');
 
        }, function fail () {
         console.log('echec');
       
        }, this.base64Image, this.options)
      
     }, (err) => {
      console.log(err);
      console.log('no ok');
    });
  }

  masquerChamp(){
    var json = this.myFormulaire.value;
    if(json.typeannonce== 'emporter' || json.typeannonce== 'permanente'){
      this.myFormulaire.controls['myDate'].setValue('2019-12-31');
      this.myFormulaire.controls['heuredebut'].setValue('18-30');
      this.myFormulaire.controls['heurefin'].setValue('21-30');
      this.myFormulaire.controls['nbconvivesmin'].setValue('1');
      this.myFormulaire.controls['nbconvivesmax'].setValue('2000');
      console.log(json.typeannonce);
      this.value = 1;
      console.log(this.value);
    }
    else{
      this.value = 0;
      this.myFormulaire.controls['myDate'].setValue('');
      this.myFormulaire.controls['heuredebut'].setValue('');
      this.myFormulaire.controls['heurefin'].setValue('');
      this.myFormulaire.controls['nbconvivesmin'].setValue('');
      this.myFormulaire.controls['nbconvivesmax'].setValue('');
      console.log(this.value);
    }
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
                            this.myFormulaire.controls['photocouv'].setValue(this.base64Image);

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
    /*takeThePhoto(){
      this.annonceService.takeThePhoto();
    }*/

    upload()
    {
      const fileTransfer: TransferObject = this.transfer.create();

      let options1: FileUploadOptions = {
         fileKey: 'file',
         fileName: 'name.jpg',
         headers: {}
      }

      fileTransfer.upload(this.base64Image, this.sever+'api/newannonce', options1)
     .then((data) => {
       // success
       //this.newAnnonce();
       alert(data);
       console.log(data);
      }, (err) => {
       // error
       //alert("error"+JSON.stringify(err));
       console.log("error"+JSON.stringify(err));
      });
 
  }

}







    
      
    
