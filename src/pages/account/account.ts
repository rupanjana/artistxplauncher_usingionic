import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
public val:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public inappbrowser:InAppBrowser) {
  }

  sendtoinappbrowser(val){
    this.inappbrowser.create('https://development.artistxp.com/'+val,'_system')
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
