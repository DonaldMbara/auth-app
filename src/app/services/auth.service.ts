import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment.staging';
import {HttpClient, HttpStatusCode} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === HttpStatusCode.Found) {
              // Hardcoded Google URL
            window.location.href = "https://www.google.com/";  // Perform the redirection
          }
          return response.body;
        })
      );
  }


}
