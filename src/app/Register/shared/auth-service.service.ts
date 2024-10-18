import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseUrl: string = environment.apiAuthUrl;

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'clovis-public-client');
    body.set('scope', 'email openid');
    body.set('username', email);
    body.set('password', password);

    return this.http.post(this.baseUrl + '/protocol/openid-connect/token', body.toString(), {
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .pipe(
        tap((response: any) => {
          debugger;
          localStorage.setItem('clovis_token', response.access_token );
          localStorage.setItem('clovis_refresh_token', response.refresh_token );
        }),
        map((response) => response.token)
      );
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate ? expirationDate < new Date() : true;
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken.exp) return null;

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
