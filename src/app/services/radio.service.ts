import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  constructor(private http: HttpClient) { }

  getSchedule():Observable<Schedule[]>{
    return this.http.get<Schedule[]>("https://iocare.in/api/schedules");
  }
  getRecordings():Observable<Schedule[]>{
    return this.http.get<Schedule[]>("https://iocare.in/api/recordings");
  }
  getSettings():Observable<any[]>{
    return this.http.get<any[]>("https://iocare.in/api/settings");
  }
}
