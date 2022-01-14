import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(
    private http: HttpClient
  ) { }

  public getSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>("https://iocare.in/api/schedules");
  }
  public getRecordings(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>("https://iocare.in/api/recordings");
  }
  public getSettings(): Observable<any[]> {
    return this.http.get<any[]>("https://iocare.in/api/settings");
  }
  public getNews(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>("https://iocare.in/api/schedules");
  }
}
