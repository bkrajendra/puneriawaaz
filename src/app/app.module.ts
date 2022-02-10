import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ScreenOrientation,
    FormBuilder,
    MusicControls,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppVersion
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
