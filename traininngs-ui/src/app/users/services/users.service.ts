import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { urls } from '../../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  addedToCart = new BehaviorSubject(0);
  isLoggedIn = new BehaviorSubject(false);
  showLogin = new BehaviorSubject(false);

  constructor(private readonly apiService: ApiService) { }

  getWebinars(params?: string): Observable<any> {
    const url = `${urls.getWebinar}/${params}`;
    return this.apiService.get(url);
  }
  
  login(payload: any): Observable<any> {
    const url = `${urls.usersLogin}`;
    return this.apiService.post(url, payload);
  }

  signup(payload: any): Observable<any> {
    const url = `${urls.usersSignup}`;
    return this.apiService.post(url, payload);
  }

  addToCart(id: string, payload: any): Observable<any> {
    const url = `${urls.addToCart}${id}`;
    return this.apiService.post(url, payload);
  }

  getCart(): Observable<any> {
    const url = `${urls.getCartDetails}`;
    return this.apiService.get(url);
  }

  payment(payload: any): Observable<any> {
    const url = `${urls.payment}`;
    return this.apiService.post(url, payload);
  }

  getTokenDetails(): Observable<any> {
    const url = `${urls.gettokendetails}`;
    return this.apiService.get(url);
  }

  updateQuantity(payload: any): Observable<any> {
    const url = `${urls.updateQuantity}`;
    return this.apiService.put(url, payload);
  } 

  deleteItem(params: any): Observable<any> {
    const url = `${urls.deleteItem}${params.id}/${params.paymentFor}/${params.quantity}`;
    return this.apiService.delete(url);
  } 

  addSpeaker(payload: any): Observable<any> {
    const url = `${urls.saveSpeaker}`;
    return this.apiService.post(url, payload);
  }

  getWebinarTypes(): Observable<any> {
    const path = urls.getWebinarTypes;
    return this.apiService.get(path);
  }

  getCategories(): Observable<any> {
    const path = urls.getCategories;
    return this.apiService.get(path);
  }

  sendRequest(payload: any): Observable<any> {
    const path = urls.sendRequest;
    return this.apiService.post(path, payload)
  }

  paySession(payload: any): Observable<any> {
    const path = urls.paySession;
    return this.apiService.post(path, payload)
  }

  orderUpdate(payload: any): Observable<any> {
    const url = `${urls.orderUpdate}`;
    return this.apiService.post(url, payload);
  }

}
