import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Instagram } from '@ionic-native/instagram';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,private iab: InAppBrowser,private instagram: Instagram,private socialSharing: SocialSharing) {
       // this.iab.create('https://development.artistxp.com/','_system');





       /* let TIME_IN_MS = 2000;
        let hideFooterTimeout = setTimeout( () => {
            //alert(' args before in home ');
            // somecode

            //alert(' args after in home ');
            this.instashare();

        }, TIME_IN_MS);*/


    }
    instashare(){


        this.socialSharing.canShareVia('instagram').then(() => {
            // Sharing via email is possible
            //alert(555);

        }).catch(() => {
            // Sharing via email is not possible
            alert('in can share insta catch');
        });

        this.socialSharing.shareViaInstagram('test','https://developmentapi.audiodeadline.com/nodeserver/uploads/pictures/5c409e01a3d1bf857f1ecbe9/updatedpdfaboutaffilates-1552669785.jpg').then(()=>{

        }).catch (()=>{

            alert('in share catch');
        });



    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

}