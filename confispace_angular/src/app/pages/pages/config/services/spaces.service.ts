import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpacesService {

  uri_api: string = environment.uri_api + 'conf/';

  constructor(private http: HttpClient) { }

  getSpacesGeneral() {
    return this.http.get(`${this.uri_api}spaces/general/`);
  }

  getSpace(id: number) {
    return this.http.get(`${this.uri_api}space/detail/${id}/`);
  }

  getSpaceSchedules(id: number) {
    return this.http.get(`${this.uri_api}space/schedules/${id}/`);
  }

  createSpace(data: any) {
    return this.http.post(`${this.uri_api}space/create/`, data);
  }

  updateSpace(id: number, data: any) {
    return this.http.put(`${this.uri_api}space/update/${id}/`, data);
  }

  updateSpaceStatus(id: number) {
    return this.http.put(`${this.uri_api}space/updateStatus/${id}/`, {});
  }
}
