import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeliveryOrder } from '../model/delivery-order';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class SimpleWMSService {
  private baseURL = 'https://simplewms.herokuapp.com';
  private deliveryOrdersURL = 'api/orders';

  constructor(private httpClient: HttpClient) { }

  getDeliveryOrderList(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.deliveryOrdersURL}`)
      .pipe(
        tap(response => console.log(JSON.stringify(response))),
        catchError(this.handleError)
      );
  }

  // getCratebyCrateId(crateId: number): Observable<any> {
  //   return this.httpClient.get(`https://simplewms.herokuapp.com/api/crate/${crateId}`);
  // }

  // getCratebyDeliveryOrderId(deliveryOrderId: number): Observable<any> {
  //   return this.httpClient.get(`https://simplewms.herokuapp.com/api/crate/findByDeliveryOrderId/?deliveryOrderId=${deliveryOrderId}`);
  // }

  // getCratebyLabelId(labelId: number): Observable<any> {
  //   return this.httpClient.get(`https://simplewms.herokuapp.com/api/crate/findByLabelId/?labelId=${labelId}`);
  // }

  // getCratebyPalletId(palletId: number): Observable<any> {
  //   return this.httpClient.get(`https://simplewms.herokuapp.com/api/crate/findByPalletId/?palletId=${palletId}`);
  // }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Simple WMS Service returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}