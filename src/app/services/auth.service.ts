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

  login(data: any, redirectUri: string): Observable<any> {
    const url = `${this.apiUrl}/login?redirectUri=${encodeURIComponent(redirectUri)}`;
    return this.http.post<any>(url, data, { observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === HttpStatusCode.Found) {
            window.location.href = redirectUri; // Redirect for testing
          }
          return response.body;
        })
      );
  }



}
