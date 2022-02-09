import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  apiBaseUrl: string  = "https://puneriawaz.herokuapp.com/api/v1/";
  constructor(
    private http: HttpClient
  ) { }

  public getSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>("https://iocare.in/api/schedules");
  }
  public getRecordings(): Observable<any[]> {
    return this.http.get<any[]>("https://iocare.in/api/recordings");
  }
  public getSettings(): Observable<any[]> {
    return this.http.get<any[]>("https://iocare.in/api/settings");
  }
  public getNews(): Observable<any[]> {
    return this.http.get<any[]>("https://iocare.in/api/schedules");
  }
  public geListeners(): Observable<any[]> {
    //const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
    const headers = new HttpHeaders({});
    return this.http.get<any[]>("https://icecast.bkwsu.eu/status-json.xsl",{ headers});
  }
  public postFeedback(data): Observable<any[]> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any[]>("http://localhost:8081/api/v1/feedback", data);
  }

  public postJoin(data): Observable<any[]> {
    return this.http.post<any[]>("https://iocare.in/api/v1/join", data);
  }
}
