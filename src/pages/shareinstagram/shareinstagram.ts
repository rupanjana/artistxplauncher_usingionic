import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Instagram } from '@ionic-native/instagram';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the ShareinstagramPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-shareinstagram',
    templateUrl: 'shareinstagram.html',
})
export class ShareinstagramPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,private instagram: Instagram,private socialSharing: SocialSharing,private iab: InAppBrowser) {

        this.instashare();
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
        console.log('ionViewDidLoad ShareinstagramPage');
    }

}