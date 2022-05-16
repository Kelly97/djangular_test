import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {}
  
  saveItem(key:string, value:any):void{
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key:string):any{
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clear():void{
    localStorage.clear();
  }
  
}
