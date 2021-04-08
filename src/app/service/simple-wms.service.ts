import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SimpleWMSService {
  constructor(private httpClient: HttpClient) {

  }

  getDeliveryOrder(): Observable<any> {
    return this.httpClient.get("https://simplewms.herokuapp.com/api/orders");
  }

}