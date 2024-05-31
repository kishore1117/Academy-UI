import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/local.config';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
  getBaseUrl(): string {
    return environment.apiUrl;
  }
}