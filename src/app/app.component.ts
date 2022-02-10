import { Component } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Location } from '@angular/common';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appv: string;
  public appPages = [
    {title: 'Listen Now', url: '/radio', icon: 'radio'},
    {title: 'About', url: '/about', icon: 'help-circle'},
    {title: 'Schedule', url: '/schedule', icon: 'calendar'},
    {title: 'Join', url: '/join', icon: 'add-circle'},
    {title: 'Feedback', url: '/feedback', icon: 'share'},
    {title: 'Contact', url: '/contact', icon: 'mail'},
    {title: 'Privacy Policy', url: '/privacy', icon: 'shield-half'},
   ];
  
  constructor(
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private sshare: SocialSharing,
    private _location: Location,
    private alertController: AlertController,
    private appVersion: AppVersion
  ) {
    console.log(this.screenOrientation.lock);
    if (this.screenOrientation.lock) {
      
    }
    this.platform.ready().then(() => {
      this.appVersion.getVersionNumber().then(v=>{
        console.log(v);
        this.appv = v;
      }).catch((e) => {
        console.log(e);
      });
      
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(d=>{
        console.log(d);
      }).catch(e=>{
        console.log(e)
      })
      
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this._location.isCurrentPathEqualTo('/radio')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this._location.back();
      }
    });
    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });
  }

  shareIt(){
    let options = {
      message: 'Share Puneri Awaz', // not supported on some apps (Facebook, Instagram)
      subject: 'Share Puneri Awaz', // fi. for email
      url: 'https://puneriawaz.in/',
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    };

    this.sshare.shareWithOptions(options).then(data=>{
      console.log(data);
    });

  }

  onSuccess(result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  };
  
  onError(msg) {
    console.log("Sharing failed with message: " + msg);
  };

  showExitConfirm() {
    this.alertController.create({
      header: 'Close App?',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }
}
