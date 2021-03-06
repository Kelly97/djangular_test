import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private router: Router) { }

  saveItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  saveObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clearStorage(): void {
    localStorage.clear();
  }

  setToken(token: string) {
    this.saveItem('token', token);
  }

  getToken() {
    return this.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  setUser(data: any) {
    this.saveObject('user', data);
  }

  getUser() {
    return this.getObject('user');
  }

  updateUser(data: any) {
    let user = { ...this.getUser(), ...data };
    this.setUser(user);
  }

  isAuthenticated() {
    return this.getToken() ? true : false;
  }

  logOut() {
    this.removeToken();
    this.router.navigate(['/login']);
    this.clearStorage();
  }

}
