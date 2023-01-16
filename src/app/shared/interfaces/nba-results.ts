export interface NbaResults {
  home_team: {
    abbreviation:string;
    full_name:string;
    id:number;
    conference:string;
  }
  home_team_score:number;
  visitor_team: {
    abbreviation:string;
    full_name:string;
    id:number;
    conference:string;
  }
  visitor_team_score:number;
}


