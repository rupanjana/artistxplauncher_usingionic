import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtistsearchPage } from './artistsearch';

@NgModule({
  declarations: [
    ArtistsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtistsearchPage),
  ],
})
export class ArtistsearchPageModule {}
