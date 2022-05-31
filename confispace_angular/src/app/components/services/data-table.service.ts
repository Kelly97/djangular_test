import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  uri_api: string = environment.uri_api;

  constructor(private http: HttpClient) { }

  deleteITem(id: number, url: string) {
    return this.http.delete(`${this.uri_api}${url}${id}/`);
  }

  getItems(url: string) {
    return this.http.get(`${this.uri_api}${url}`);
  }
}
