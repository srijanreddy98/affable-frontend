import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfluencersService {

  constructor(private http: HttpClient) { }

  getInfluencers(body, offset) {
    return this.http.post(`/api/interests?offset=${offset}`, body.filters);
  }
  getInterests() {
    return this.http.get(`/api/allInterests`);
  }
}
