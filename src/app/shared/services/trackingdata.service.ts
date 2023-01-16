import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Team} from "../interfaces/team";

@Injectable({
  providedIn: 'root'
})
export class TrackingdataService {

  public configUrl = 'https://free-nba.p.rapidapi.com/teams';
  private reqHeader = new HttpHeaders({
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {
  }

  getTeamsData(): Observable<HttpResponse<Team[]>> {
    return this.http.get<Team[]>(this.configUrl, {observe: 'response', headers: this.reqHeader});
  }

  getTeamTrackingData(teamId: number) {
    let dates = this.getLastTwelveDays();
    let url = 'https://free-nba.p.rapidapi.com/games?page=0&'+dates+'&per_page=12&team_ids[]=' + teamId;
    return this.http.get<Team[]>(url, {observe: 'response', headers: this.reqHeader});
  }

  getLastTwelveDays() {
    const today = new Date();
    let i = 12;
    let dateStr = '';
    for (i; i > 0; i--) {
      let Yesterday = new Date(today)
      Yesterday.setDate(Yesterday.getDate() - i);
      let month = Yesterday.getMonth() + 1;
      let year = Yesterday.getFullYear();
      let day = Yesterday.getDate() +1;
      dateStr += 'dates[]=' + year.toString();
      if (month >= 10) {
        dateStr +=  '-' + month.toString();
      } else {
        dateStr += '-0' + month.toString();
      }
      if (day >= 10) {
        dateStr += '-' + day.toString();
      } else {
        dateStr += '-0' + day.toString();
      }
      if (i !== 1) {
        dateStr += '&';
      }
    }
  }

}


