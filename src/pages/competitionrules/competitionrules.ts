import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';

/**
 * Generated class for the CompetitionrulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-competitionrules',
  templateUrl: 'competitionrules.html',
})
export class CompetitionrulesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public inappbrowser:InAppBrowser) {
  }
  dancercompetitionrulefunc(){
    this.inappbrowser.create('https://development.artistxp.com/dancercompetitionrules','_system');
  }
  Producercompetitionrulefunc(){
    this.inappbrowser.create('https://development.artistxp.com/producercompetitionrules','_system');
  }
  Rappercompetitionrulefunc(){
    this.inappbrowser.create('https://development.artistxp.com/rappercompetitionrules','_system');
  }
  Vocalistcompetitionrulefunc(){
    this.inappbrowser.create('https://development.artistxp.com/vocalistcompetitionrules','_system');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CompetitionrulesPage');
  }

}
