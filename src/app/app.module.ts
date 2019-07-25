import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Instagram } from '@ionic-native/instagram';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShareinstagramPage } from '../pages/shareinstagram/shareinstagram';
import { LoginPage } from '../pages/login/login';
import { MedialistPage } from '../pages/medialist/medialist';
import { MediawallPage } from '../pages/mediawall/mediawall';
import { TermsPage } from '../pages/terms/terms';
import { SearchPage } from '../pages/search/search';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Clipboard } from '@ionic-native/clipboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShareinstagramPage,LoginPage,MedialistPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,ShareinstagramPage,LoginPage,MedialistPage

  ],
  providers: [
    StatusBar,
    SplashScreen,InAppBrowser,Deeplinks,Instagram,SocialSharing,HTTP,Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
