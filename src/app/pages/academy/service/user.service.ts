import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrlService } from "src/app/shared/service/apiUrl.service";

@Injectable({
    providedIn:'root'
})

export class UserService{
    constructor(private http:HttpClient,private apiUrlService:ApiUrlService){
    }
    
      url =  this.apiUrlService.getBaseUrl();

    private get headers(): HttpHeaders {
        const token = localStorage.getItem('token');
        if (token) {
            return new HttpHeaders({
                'Authorization': 'Bearer ' + token
            });
        } else {
            return new HttpHeaders();
        }
    }

    getUser():Observable<any>{
        return this.http.get<any>(`${this.url}/current`,{ headers:this.headers })
    }

    getLocationById(id:number):Observable<any>{
        return this.http.get<any>(`${this.url}/location/${id}`,{ headers: this.headers })
    }

    getLocationStudents(id:number):Observable<any>{
        return this.http.get<any>(`${this.url}/location/students?location_id=${id}`,{ headers: this.headers })
    }

    setInvite(invitePayload:any):Observable<any>{
        return this.http.post<any>(`${this.url}/admin/invite`,invitePayload,{ headers: this.headers })
    }

    getFranchiseUser(franchise_id:number):Observable<any>{
        return this.http.get<any>(`${this.url}/users/franchise/${franchise_id}`,{ headers: this.headers })
    }
}