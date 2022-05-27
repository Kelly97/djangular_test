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
    return this.http.get(this.uri_api + 'spaces/general/');
  }

  getSpace(id: number) {
    return this.http.get(this.uri_api + `space/detail/${id}/`);
  }
}
