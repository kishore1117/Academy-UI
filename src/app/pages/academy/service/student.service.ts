import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrlService } from "src/app/shared/service/apiUrl.service";


@Injectable({
    providedIn:'root'
})

export class StudentService{
    constructor(private http:HttpClient,private apiUrlService:ApiUrlService){}

    url =  this.apiUrlService.getBaseUrl();

    headers = new HttpHeaders({
       'Authorization': 'Bearer ' +localStorage.getItem('token')
     });

     addStudents(details:any):Observable<any>{
        return this.http.post<any>(`${this.url}/student`,details, { headers: this.headers } )
     }

     updateStudent(details:any,id:number):Observable<any>{
        return this.http.patch<any>(`${this.url}/student/${id}`,details,{headers:this.headers})
     }

     deleteStudent(id:number):Observable<any>{
      return this.http.delete<any>(`${this.url}/student/${id}`,{headers:this.headers})
     }
}