import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Radio', url: '/radio', icon: 'radio'},
    {title: 'About', url: '/about', icon: 'help-circle'},
    {title: 'Schedule', url: '/schedule', icon: 'calendar'},
    {title: 'News', url: '/news', icon: 'newspaper'},
    {title: 'Privacy Policy', url: '/privacy', icon: 'shield-half'}
  ];
  
  constructor() {}
}
