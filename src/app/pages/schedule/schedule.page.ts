import { Component, OnInit } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';
import { RadioService } from 'src/app/services/radio.service';
import { Schedule } from 'src/app/services/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  schedule: Schedule[] = [];

  constructor(
    private cloud: CloudService
  ) { }

  ngOnInit(): void {
    this.getSchedule();
  }
  getSchedule(): void {
    this.schedule = null;
    this.cloud.getSchedule().subscribe(data => {
      console.log(data);
      this.schedule = data;
    })
  }

}
