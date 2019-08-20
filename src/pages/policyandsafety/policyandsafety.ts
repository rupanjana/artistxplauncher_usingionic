import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TermsofusePage } from '../termsofuse/termsofuse';
/**
 * Generated class for the PolicyandsafetyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-policyandsafety',
  templateUrl: 'policyandsafety.html',
})
export class PolicyandsafetyPage {
 public var:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public inappbrowser:InAppBrowser) {
  }
  sendtoinappbrowser(val){
    this.inappbrowser.create('https://development.artistxp.com/'+val,'_system')
   }
   gototermsofusepage(){
    this.navCtrl.push(TermsofusePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolicyandsafetyPage');
  }
   
}
