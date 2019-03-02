import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfluencersService {

  constructor(private http: HttpClient) { }

  getInfluencers(offset: number, body) {
    return this.http.post(`/api/noInterests?offset=${offset}`, body);
  }
  getInterests() {
    return this.http.get(`/api/allInterests`);
  }
  getFilteredInterests(body, offset: number) {
    console.log(body, offset);
    return this.http.post(`/api/interests?offset=${offset}`, body.filters);
  }
}
