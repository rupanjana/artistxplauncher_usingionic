import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the GetstartedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getstarted',
  templateUrl: 'getstarted.html',
})
export class GetstartedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public inappbrowser:InAppBrowser) {
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
    console.log('ionViewDidLoad GetstartedPage');
  }

}
