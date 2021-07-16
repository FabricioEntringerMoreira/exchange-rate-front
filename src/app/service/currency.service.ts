import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Currency } from '../model/currency';
import { Exchange } from '../model/exchange';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  // To local test, change here:
  
  url_find_all_currency = 'https://exchange-rate.herokuapp.com/currencies'
  url_find_all_exchanges_executed = 'https://exchange-rate.herokuapp.com/exchanges'
  url_execute_exchange = 'https://exchange-rate.herokuapp.com/currencies'
  
  //url_find_all_currency = 'http://localhost:8081/currencies'
  //url_find_all_exchanges_executed = 'http://localhost:8081/exchanges'
  //url_execute_exchange = 'http://localhost:8081/currencies'

  // HttpClient injection
  constructor(private httpClient: HttpClient) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }

  getCurrencies(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(this.url_find_all_currency)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getExchangesExecuted(): Observable<Exchange[]> {
    return this.httpClient.get<Exchange[]>(this.url_find_all_exchanges_executed)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  executeExchange(exchange: Exchange): Observable<Exchange> {
    return this.httpClient.post<Exchange>(this.url_execute_exchange, JSON.stringify(exchange), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {// Client side error
      errorMessage = error.error.message;
    } else { // Backend error
      errorMessage = 'Error code: ${error.status}, ' + 'message: ${error.message}';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };



}
