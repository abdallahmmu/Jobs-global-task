import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'https://api-next.jobsglobal.com:54902/api/v1/jobs'

@Injectable({
  providedIn: 'root',
})
export class DataContextService {
  constructor(private http: HttpClient) { }

  GetData(
    url: string,
    params: any = null,
    headersObject: any = null
  ): Observable<any> {
    const confirguration = {
      headers: headersObject,
      params: params,
    };
    return this.http.get(URL + url, { ...confirguration });
  }


  PostData(url: string, data: any) {
    return this.http.post(URL + url, data);
  }
}