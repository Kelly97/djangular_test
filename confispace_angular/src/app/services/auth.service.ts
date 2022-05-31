import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  uri_api: string = environment.uri_api + 'sec/';

  loginService(data: any) {
    return this.http.post(this.uri_api + 'login/', data, { headers: environment.skipNotifierHeader });
  }

  regiterService(data: any) {
    return this.http.post(this.uri_api + 'register/', data, { headers: environment.skipNotifierHeader });
  }

  logoutService() {
    return this.http.post(this.uri_api + 'logout/', {}, { headers: environment.skipNotifierHeader });
  }

  profile() {
    return this.http.get(this.uri_api + 'profile/');
  }

}
