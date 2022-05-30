import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  uri_api: string = environment.uri_api + 'conf/';

  constructor(private http: HttpClient) { }

  getPublicHolidays() {
    return this.http.get(`${this.uri_api}holidays/list/`);
  }

  getHolidays() {
    return this.http.get(`${this.uri_api}holidays/listcreate/`);
  }

  getHoliday(id: number) {
    return this.http.get(`${this.uri_api}holidays/retrieveupdate/${id}/`);
  }

  updateHoliday(id: number, data: any) {
    return this.http.put(`${this.uri_api}holidays/retrieveupdate/${id}/`, data);
  }

  deleteHoliday(id: number) {
    return this.http.delete(`${this.uri_api}holidays/destroy/${id}/`);
  }

  createHoliday(data: any) {
    return this.http.post(`${this.uri_api}holidays/listcreate/`, data);
  }
}
