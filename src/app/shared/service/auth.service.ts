import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginBody, SigupBody } from 'src/app/pages/session-page/session-models/signup-model';
import { ApiUrlService } from './apiUrl.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) {}

  url =  this.apiUrlService.getBaseUrl();

  signup(credentials:SigupBody): Observable<any> {
     return this.http.post<any>(`${this.url}/signup`,credentials)
  }

  login(credentials:LoginBody): Observable<any> {
    return this.http.post<any>(`${this.url}/login`,credentials)
  }
}