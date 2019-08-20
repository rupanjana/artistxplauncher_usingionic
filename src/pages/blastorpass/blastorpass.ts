import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { Content,AlertController } from 'ionic-angular';
/**
 * Generated class for the BlastorpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blastorpass',
  templateUrl: 'blastorpass.html',
})
export class BlastorpassPage {
  public user_id: any='';
  public username: any='';
  public graburlset:any="https://development.artistxp.com/fbartistxp/";
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public clipboard:Clipboard,public alertctrl:AlertController) {
    this.storage.get('userid').then((val) => {
      this.user_id = val;

     /* setTimeout(()=>{
        // this.getTicketsaleBanner();

      },1000);*/
    });


    this.storage.get('username').then((value) => {
      this.username = value;

      /*setTimeout(()=>{
        // this.getTicketsaleBanner();
        //this.getBannersLists();

      },1000);*/
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlastorpassPage');
  }

  presentAlert() {
    let alert = this.alertctrl.create({
      message: 'Copied to clipboard successfully',
      buttons: ['Okay']
    });
    alert.present();
  }
  public urlsetwithusername:any=this.graburlset+this.username;
  copyurl(urlsetwithusername){
   // alert('in copyurl fubction');
    console.log(urlsetwithusername);
    // alert(urlsetwithusername);
    this.clipboard.copy(urlsetwithusername);
    setTimeout(()=>{
     this.presentAlert();
    },1000);

  }

}
