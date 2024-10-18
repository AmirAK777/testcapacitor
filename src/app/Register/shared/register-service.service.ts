import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { MarketingCampaign } from './marketingCampaign';
import { RegisteredUser } from './registeredUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly baseUrl: string = environment.apiUrl;

  createdUser = signal<RegisteredUser>(this.loadUserFromLocalStorage());

  constructor(private readonly http: HttpClient) { }

  getMarketingCampaignById(marketingCampaignId: string): Observable<MarketingCampaign> {
    return this.http.get<MarketingCampaign>(this.baseUrl + "campaigns/" + marketingCampaignId);
  }

  getDefaultMarketingCampaign(): Observable<MarketingCampaign> {
    return this.http.get<MarketingCampaign>(this.baseUrl + "campaigns/default");
  }

  createCustomer() {
    return this.http.post<string>(this.baseUrl + "customers", JSON.stringify(this.createdUser()), {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(response => {
        this.updateUserProperty('customerId', response);
        return response;
      })
    );
  }

  updateUserProperty<K extends keyof RegisteredUser>(key: K, value: RegisteredUser[K]) {
    const updatedUser = { ...this.createdUser(), [key]: value };
    this.createdUser.set(updatedUser);
    this.saveUserToLocalStorage(updatedUser);
  }

  registerCustomer() {
    return this.http.post<string>(this.baseUrl + 'users/customers', JSON.stringify(this.createdUser()),
      { headers: { 'Content-Type': 'application/json' } });
  }

  deleteLocalStarageInformations(){
    localStorage.removeItem('register_form_answers');
    this.createdUser = signal<RegisteredUser>(new RegisteredUser());
  }

  private loadUserFromLocalStorage(): RegisteredUser {
    if (typeof window !== 'undefined' && localStorage) {
      const savedUser = localStorage.getItem('register_form_answers');
      return savedUser ? JSON.parse(savedUser) : new RegisteredUser();
    }
    return new RegisteredUser();
  }

  private saveUserToLocalStorage(user: RegisteredUser) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('register_form_answers', JSON.stringify(user));
    }
  }
}
