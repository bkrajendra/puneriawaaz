import { Component } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Radio', url: '/radio', icon: 'radio'},
    {title: 'Schedule', url: '/schedule', icon: 'calendar'},
    {title: 'Share', url: '/share', icon: 'share'},
    {title: 'About', url: '/about', icon: 'help-circle'},
    {title: 'Contact', url: '/contact', icon: 'mail'},
    {title: 'Join', url: '/join', icon: 'add-circle'},
    {title: 'Privacy Policy', url: '/privacy', icon: 'shield-half'},
   ];
  
  constructor(
    private screenOrientation: ScreenOrientation
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
}
