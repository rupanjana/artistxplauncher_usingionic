import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediawallPage } from './mediawall';

@NgModule({
  declarations: [
    MediawallPage,
  ],
  imports: [
    IonicPageModule.forChild(MediawallPage),
  ],
})
export class MediawallPageModule {}
