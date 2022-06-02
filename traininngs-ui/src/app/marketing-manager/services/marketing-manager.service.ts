import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { urls } from '../../urls/urls';

@Injectable({
  providedIn: 'root'
})
export class MarketingManagerService {

  constructor(private readonly apiService: ApiService) { }

  getItems(url: string): Observable<any> {
    return this.apiService.get(url);
  }

  login(payload: any): Observable<any> {
    const url = urls.marketingManagerLogin;
    return this.apiService.post(url, payload);
  }

  getSpeakers(): Observable<any> {
    const path = `${urls.getSpeakers}all`;
    return this.apiService.get(path);
  }

  updateSpeaker(payload: any): Observable<any> {
    const path = `${urls.updateSpeaker}${payload.id}`;
    return this.apiService.post(path, payload);
  }

}
