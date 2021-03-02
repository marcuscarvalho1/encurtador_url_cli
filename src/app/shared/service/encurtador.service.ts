import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from '../model/url.module';

@Injectable({
  providedIn: 'root'
})
export class EncurtadorService {
    
    //apiUrl = 'http://localhost:8080/api';
    apiUrl = 'https://encurtador-url-api.herokuapp.com/api'
    linha: string = "";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };         

  constructor(
    private httpClient1: HttpClient
  ) { }
  
  public getUrlsNaoExpiradas(): Observable<Url[]>{      
    return this.httpClient1.get<Url[]>(this.apiUrl + "/nao_expiradas");
  }
  
  public getUrls(): Observable<Url[]>{
    return this.httpClient1.get<Url[]>(this.apiUrl + "/urls");
  }
  
  public consultaUrlEncurtada(requestPath: string): Observable<Url>{
    return this.httpClient1.get<Url>(this.apiUrl + "/url_encurtada/" + requestPath);
  }
  
  public consultaUrlReal(url1: Url): Observable<Url>{
    return this.httpClient1.post<Url>(this.apiUrl + "/url_real", url1, this.httpOptions);
  }
  
  public insereUrlEncurtada(url1: Url): Observable<Url>{
      return this.httpClient1.post<Url>(this.apiUrl + "/encurtar", url1, this.httpOptions);
  }
  
  public alteraUrl(url1: Url): Observable<Url>{
      return this.httpClient1.put<Url>(this.apiUrl + "/encurtar", url1, this.httpOptions);
  }

}
