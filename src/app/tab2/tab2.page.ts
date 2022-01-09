import { Component, OnInit } from '@angular/core';
import { RadioService } from '../services/radio.service';
import { Schedule } from '../services/schedule';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit  {
  schedule:Schedule[] = [];
  constructor(
    private rs:RadioService
  ) {}

  ngOnInit(): void {
    this.getSchedule();
  }
  getSchedule():void{
    this.rs.getSchedule().subscribe(data => {
      console.log(data);
      this.schedule = data;
    })
  }
}
