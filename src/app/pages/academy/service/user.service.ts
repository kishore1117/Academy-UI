import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrlService } from "src/app/shared/service/apiUrl.service";

@Injectable({
    providedIn:'root'
})

export class UserService{
    constructor(private http:HttpClient,private apiUrlService:ApiUrlService){}
    
      url =  this.apiUrlService.getBaseUrl();

     headers = new HttpHeaders({
        'Authorization': 'Bearer ' +localStorage.getItem('token')
      });
      

    getUser(franchise_id:number):Observable<any>{
        return this.http.get<any>(`${this.url}/location?franchise_id=${franchise_id}`,{ headers: this.headers })
    }

    getLocationById(id:number):Observable<any>{
        return this.http.get<any>(`${this.url}/location/${id}`,{ headers: this.headers })
    }

    getLocationStudents(id:number):Observable<any>{
        return this.http.get<any>(`${this.url}/location/students?location_id=${id}`,{ headers: this.headers })
    }
}