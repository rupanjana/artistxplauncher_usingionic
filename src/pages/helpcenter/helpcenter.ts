import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GetstartedPage } from '../getstarted/getstarted';
import { SupportartistresourcePage } from '../supportartistresource/supportartistresource';
import { ArtistxphowtoPage } from '../artistxphowto/artistxphowto';
import { AccountPage } from '../account/account';
import {  PolicyandsafetyPage } from '../policyandsafety/policyandsafety'
/**
 * Generated class for the HelpcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-helpcenter',
  templateUrl: 'helpcenter.html',
})
export class HelpcenterPage {
 public tab1Root1:any;
 public tab2Root2:any;
 public tab3Root3:any;
 public tab4Root4:any;
 public tab5Root5:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public inappbrowser:InAppBrowser) {

    this.tab1Root1 = GetstartedPage;
    this.tab2Root2 = SupportartistresourcePage;
    this.tab3Root3 = ArtistxphowtoPage;
    this.tab4Root4 = AccountPage;
    this.tab5Root5 = PolicyandsafetyPage;
  
  }

  helpcenterwhatisartistxp(){
   this.inappbrowser.create('https://development.artistxp.com/helpcenterwhatisartistxp','_system');
  }
  helpcenterFeatureRequestandFeedback(){
   this.inappbrowser.create('https://development.artistxp.com/profile','_system');
  }
  helpcenterAnatomy(){
   this.inappbrowser.create('https://development.artistxp.com/helpcenteranatomyofartistxp','_system');
  }
  helpcenterArtistExchange(){
   this.inappbrowser.create('https://development.artistxp.com/helpcenterartistexchange','_system');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpcenterPage');
  }

}
