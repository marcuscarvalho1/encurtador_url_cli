import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePageable } from '../model/responsePageable';

@Injectable({
  providedIn: 'root'
})
export class EncurtadorService {
    
    apiUrl = 'http://localhos:8080/api';
    
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

  constructor(
    private httpClient: HttpClient
  ) { }
  
  public getUrlsNaoExpirados(): Observable<ResponsePageable>{
      return this.httpClient.get<ResponsePageable>(this.apiUrl + "/nao_expiradas");
  }
}
