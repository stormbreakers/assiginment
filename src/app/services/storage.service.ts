import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  set(key: any, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: any) {
    const get = localStorage.getItem(key);
    if (get != null && get !== undefined && get !== 'undefined') {
      return JSON.parse(get);
    }
    return null;
  }

  delete(key: any) {
    return localStorage.removeItem(key);
  }
}
