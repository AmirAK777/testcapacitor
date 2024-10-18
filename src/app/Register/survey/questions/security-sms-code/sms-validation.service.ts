import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsValidationService {

  private readonly baseUrl: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  sendSmsValidation(phoneNumber: string): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'send-sms-validation', {phoneNumber: phoneNumber});
  }

  sendCodeValidation(requestId: string, code: string, email: string) {
    return this.http.post(this.baseUrl + 'validation-sms-code', {requestId: requestId, code: code, email: email});
  }
}
