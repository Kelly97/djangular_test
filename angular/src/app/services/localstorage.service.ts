import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

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

  clear(): void {
    localStorage.clear();
  }

  setToken(token:string) {
    this.saveItem('token', token);
  }

  getToken() {
    return this.getItem('token');
  }
}
