import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError, of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  history: any[] = [];
  constructor(
    private http: HttpClient,
    public storageService: StorageService,
  ) {
    const dataExist = this.storageService.get('history');
    if (dataExist) {
      this.history = dataExist;
    }
  }

  getUserList(search: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.github.v3+json'
    });

    const url = 'https://api.github.com/search/users'
    const options: any = { headers };
    if (search) {
      options['params'] = {
        q: search
      }
    }
    return this.getApi(url, options);
  }

  getUserDetails(url: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/vnd.github.v3+json'
    });
    const options: any = { headers };
    return this.getApi(url, options);
  }

  getApi(url: string, options: any) {
    return this.http.get(url, options).pipe(
      map((data) => data),
      catchError(err => of(err.error || 'Server error'))
    )
  }
}
