import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { UserRegisterPage } from '../pages/user-register/user-register';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { AProposPage } from '../pages/a-propos/a-propos';
import { ListeAnnoncePage } from '../pages/liste-annonce/liste-annonce';
import { HttpModule } from '@angular/http';
import { DeposerUneannoncePage } from '../pages/deposer-uneannonce/deposer-uneannonce';
import { DataServicesProvider } from '../providers/data-services/data-services';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { AnnonceServiceProvider } from '../providers/annonce-service/annonce-service';
import { ViewAnnoncePage } from '../pages/view-annonce/view-annonce';
import { ReservationModalPage } from '../pages/reservation-modal/reservation-modal';
//import {Push} from "@ionic-native/push";
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { DashbordPage } from '../pages/dashbord/dashbord';
import { MesAnnoncesPage } from '../pages/mes-annonces/mes-annonces';
import { MesReservationsPage } from '../pages/mes-reservations/mes-reservations';
import { AvisPage } from '../pages/avis/avis';
import { PaiementPage } from '../pages/paiement/paiement';
import { NotificationPage } from '../pages/notification/notification';
import { NewPaiementPage } from '../pages/new-paiement/new-paiement';
import { VirementPage } from '../pages/virement/virement';
import { DetailsNotificationPage } from '../pages/details-notification/details-notification';
import { DetailsReservationPage } from '../pages/details-reservation/details-reservation';
import { FormAvisPage } from '../pages/form-avis/form-avis';
import { ProfilPage } from '../pages/profil/profil';
import { TabsPage } from '../pages/tabs/tabs';
import { RecherchePage } from '../pages/recherche/recherche';
import { PhonePage } from '../pages/phone/phone';
import { ResultRecherchePage } from '../pages/result-recherche/result-recherche';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { CodeValidatePage } from '../pages/code-validate/code-validate';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Network } from '@ionic-native/network';
import { NavbarComponent } from '../components/navbar/navbar';
import { Toast } from '@ionic-native/toast';
import {LoadingModalComponent} from '../components/loading-modal/loading-modal';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserRegisterPage,
    MenuPage,
    LoginPage,
    AProposPage,
    DeposerUneannoncePage,
    ListeAnnoncePage,
    ViewAnnoncePage,
    ReservationModalPage,
    ProgressBarComponent,
    DashbordPage,
    MesAnnoncesPage,
    MesReservationsPage,
    AvisPage,
    PaiementPage,
    NotificationPage,
    NewPaiementPage,
    VirementPage,
    DetailsNotificationPage,
    DetailsReservationPage,
    FormAvisPage,
    ProfilPage,
    TabsPage,
    RecherchePage,
    ResultRecherchePage,
    PhonePage,
    CodeValidatePage,
    NavbarComponent,
    LoadingModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserRegisterPage,
    MenuPage,
    LoginPage,
    AProposPage,
    DeposerUneannoncePage,
    ListeAnnoncePage,
    ViewAnnoncePage,
    ReservationModalPage,
    DashbordPage,
    MesAnnoncesPage,
    MesReservationsPage,
    AvisPage,
    PaiementPage,
    NotificationPage,
    NewPaiementPage,
    VirementPage,
    DetailsNotificationPage,
    DetailsReservationPage,
    FormAvisPage,
    ProfilPage,
    TabsPage,
    RecherchePage,
    ResultRecherchePage,
    PhonePage,
    CodeValidatePage,
    LoadingModalComponent,
    NavbarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServicesProvider,
    LoginServiceProvider,
    AnnonceServiceProvider,
    //Push,
    UserServiceProvider,
    IonicStorageModule,
    Camera,
    ConnectivityServiceProvider,
    Diagnostic,
    Network,
    Toast,
    Transfer
  ]
})
export class AppModule {}
