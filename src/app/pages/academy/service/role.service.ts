import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class roleService {
  constructor(private http: HttpClient) {}

  getSidenavItems(): Observable<any[]> {
    return this.http.get<any[]>('sidenav-data/sidenav-data.json');
  }
}
