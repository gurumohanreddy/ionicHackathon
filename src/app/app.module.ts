import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { GamePage } from '../pages/game/game';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    HomePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    HomePage,
  ],
  providers: [Storage]
})
export class AppModule {}
