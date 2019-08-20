import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController,ViewController } from 'ionic-angular';


/**
 * Generated class for the ArtistexchangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artistexchange',
  templateUrl: 'artistexchange.html',
})
export class ArtistexchangePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalctrl:ModalController,public viewctrl:ViewController) {
  }

  public closeModal(){
    this.viewctrl.dismiss();
  }

  /*presentAlert() {
    let alert = this.alertctrl.create({
      message: 'The Contact us Form is successfully submitted',
      buttons: ['Okay']
    });
    alert.present();
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistexchangePage');
  }

}
