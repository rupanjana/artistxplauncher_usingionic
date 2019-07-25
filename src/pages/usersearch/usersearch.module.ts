import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersearchPage } from './usersearch';

@NgModule({
  declarations: [
    UsersearchPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersearchPage),
  ],
})
export class UsersearchPageModule {}
