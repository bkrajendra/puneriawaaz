import { Component, OnInit } from '@angular/core';
import { RadioService } from '../services/radio.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  settingsData: any ={};
  constructor(
    private rs: RadioService
  ) {}

  ngOnInit(): void {
    this.getSettings();
  }
  getSettings():void{
    this.rs.getSettings().subscribe(data => {
      this.settingsData = data;
      console.log(this.settingsData);
    });
  }
}
