import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactusPage } from '../contactus/contactus';
/**
 * Generated class for the SupportartistresourcePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supportartistresource',
  templateUrl: 'supportartistresource.html',
})
export class SupportartistresourcePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  gotocontactuspage(){
    this.navCtrl.push(ContactusPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportartistresourcePage');
  }

}
