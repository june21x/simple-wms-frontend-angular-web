import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class SimpleWMSService {
  private baseURL = 'https://simplewms.herokuapp.com/api';
  private ordersURL = 'orders';
  private palletsURL = 'pallets';
  private cratesURL = 'crates';
  private vendorsURL = 'vendors';

  constructor(private httpClient: HttpClient) { }

  getAllOrderList(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.ordersURL}/unified`)
      .pipe(
        tap(response => console.log(response)),
        catchError(this.handleError)
      );
  }

  getDeliveryOrderList(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.ordersURL}/delivery`)
      .pipe(
        tap(response => console.log(response)),
        catchError(this.handleError)
      );
  }

  getCrateList(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.cratesURL}`)
      .pipe(
        tap(response => console.log(response)),
        catchError(this.handleError)
      );
  }

  getCrateListByDeliveryOrderId(orderId: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.ordersURL}/${orderId}/crates`).pipe(
      tap(response => console.log(response)),
      catchError(this.handleError)
    )
  }

  getPalletList(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.palletsURL}`)
      .pipe(
        tap(response => console.log(response)),
        catchError(this.handleError)
      );
  }

  getAllVendorList(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.vendorsURL}`).pipe(
      tap(response => console.log(response)),
      catchError(this.handleError)
    );
  }

  getVendorByDeliveryOrderId(orderId: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.ordersURL}/${orderId}/vendor`).pipe(
      tap(response => console.log(response)),
      catchError(this.handleError)
    )
  }
  
  autoAssignPalletId(crateId): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/${this.cratesURL}/${crateId}/assign/auto`, null);
  }

  removeCratesFromPallets(data): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/${this.cratesURL}/removefrompallet`, data);
  }

  autoAssignLabelId(crateId, data): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/${this.cratesURL}/${crateId}/linklabel/auto`, data);
  }

  linkShipmentOrderId(shipmentId, data): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/${this.cratesURL}/linkshipment/${shipmentId}`, data, {responseType: 'text'});
  }

  createNewShipmentOrder(data): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/${this.ordersURL}/insert`, data);
  }

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