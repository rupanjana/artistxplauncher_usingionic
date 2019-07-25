import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Instagram } from '@ionic-native/instagram';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage } from '@ionic/storage';
import {LoginPage} from '../login/login'
import {ShareinstagramPage} from '../shareinstagram/shareinstagram';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('myNav') nav;
    instaglag:any;
    loginpage:LoginPage;

    constructor(public navCtrl: NavController,private iab: InAppBrowser,private instagram: Instagram,private socialSharing: SocialSharing,private storage: Storage) {

        storage.get('isinsta').then((val) => {
            console.log('Your isinsta is', val);
            this.instaglag=val;
            //alert('Your isinsta is'+val);
           // if(val==false || val==null) this.iab.create('https://development.artistxp.com/','_system');
            //if(val==true) this.instashare();
        });








       /* let TIME_IN_MS = 2000;
        let hideFooterTimeout = setTimeout( () => {
            //alert(' args before in home ');
            // somecode

            //alert(' args after in home ');
            this.instashare();

        }, TIME_IN_MS);*/


    }
    gotologin(){
        this.navCtrl.push(LoginPage);
    }
   /* gotoshare(){
        this.navCtrl.push(ShareinstagramPage);
    }*/
    gotomedia(){
        this.iab.create('https://development.artistxp.com/','_system');
    }


    instashare(){


        this.socialSharing.canShareVia('instagram').then(() => {
            // Sharing via email is possible
            //alert(555);

        }).catch(() => {
            // Sharing via email is not possible
            //alert('in can share insta catch');
        });

        this.socialSharing.shareViaInstagram('test','https://developmentapi.audiodeadline.com/nodeserver/uploads/pictures/5c409e01a3d1bf857f1ecbe9/updatedpdfaboutaffilates-1552669785.jpg').then(()=>{

        }).catch (()=>{

            //alert('in share catch');
        });



    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

}