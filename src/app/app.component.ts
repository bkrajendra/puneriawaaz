import { Component } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Radio', url: '/radio', icon: 'radio'},
    {title: 'Schedule', url: '/schedule', icon: 'calendar'},
    {title: 'Feedback', url: '/feedback', icon: 'share'},
    {title: 'About', url: '/about', icon: 'help-circle'},
    {title: 'Contact', url: '/contact', icon: 'mail'},
    // {title: 'Join', url: '/join', icon: 'add-circle'},
    {title: 'Privacy Policy', url: '/privacy', icon: 'shield-half'},
   ];
  
  constructor(
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private sshare: SocialSharing
  ) {
    console.log(this.screenOrientation.lock);
    if (this.screenOrientation.lock) {
      
    }
    this.platform.ready().then(() => {
      try {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(d=>{
          console.log(d);
        })
      }
      catch(e) {
        console.error(e.message);
      }
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }

  shareIt(){
    let options = {
      message: 'Share Puneri Awaz', // not supported on some apps (Facebook, Instagram)
      subject: 'Share Puneri Awaz', // fi. for email
      url: 'https://puneriawaz.in/',
      chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
      appPackageName: 'com.whatsapp', // Android only, you can provide id of the App you want to share with
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
}
