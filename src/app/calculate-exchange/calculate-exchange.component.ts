import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../service/currency.service';

import { Currency } from '../model/currency';
import { Exchange } from '../model/exchange';

@Component({
  selector: 'app-calculate-exchange',
  templateUrl: './calculate-exchange.component.html',
  styleUrls: ['./calculate-exchange.component.css']
})

export class CalculateExchangeComponent implements OnInit{

  originCurrency: string;
  originalValue: number;
  targetCurrency: string;
  exchangeRate: number;
  finalValue: number;

  constructor(private currencyService: CurrencyService) {}

  currency = {} as Currency;
  currencies: Currency[];

  exchangesExecuted = {} as Exchange;
  exchanges: Exchange[];
    
  ngOnInit() {
    this.getCurrencies();
    this.getExchangesExecuted();

  }

  getCurrencies() {
    this.currencyService.getCurrencies().subscribe((currencies: Currency[]) => {
      
      this.currencies = currencies;
    });
  }

  getExchangesExecuted() {
    this.currencyService.getExchangesExecuted().subscribe((exchangesExecuted: Exchange[]) => {
      this.exchanges = exchangesExecuted;
    });
  }

  calculate(targetCurrency: string, insertedValue: number){
    
    this.exchangesExecuted.originCurrency = "EUR";
    this.exchangesExecuted.targetCurrency = targetCurrency;
    this.exchangesExecuted.amount = insertedValue;
    
    this.currencyService.executeExchange(this.exchangesExecuted).subscribe((exchangesExecuted: Exchange) => {
      this.getExchangesExecuted();

      this.originCurrency = exchangesExecuted.originCurrency;
      this.originalValue = exchangesExecuted.amount;
      this.targetCurrency = exchangesExecuted.targetCurrency;
      this.exchangeRate = exchangesExecuted.rate;
      this.finalValue = exchangesExecuted.value;
  
    });
    
  }


}
