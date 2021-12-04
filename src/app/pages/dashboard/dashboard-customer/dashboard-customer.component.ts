import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';
import { RestApiService } from '../../../services/api/rest-api.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.scss']
})
export class DashboardCustomerComponent implements OnInit {

  lastRefreshed;

  lcCurrency;
  fcCurrency;

  currency = {
    currencyId: '',
    currencyCode: '',
    currencyName: '',
    BuyHighRate: 0,
    BuyLowRate: 0,
    SellHighRate: 0,
    SellLowRate: 0
  };

  stockArray = [];
  currenciesArray = [];

  isDataLoaded = false;

  constructor(private auth: AuthService, private helper: HelperService, private api: RestApiService) {
    // console.log('UserID', this.auth.user.UserID);
  }

  ngOnInit() {
    this.lastRefreshed = this.helper.getCurrentTime();
    this.getData();
  }

  getData() {
    this.api.get('Dashboard/GetCashierData').then((data: any) => {
      // console.log('Data', data);
      this.currenciesArray = data.Currencies;
      this.stockArray = data.Stock;

      this.isDataLoaded = true;
    });
  }

  setCurrencyByCode() {
    if (this.currency.currencyCode !== '') {
      const currency = this.currenciesArray.filter(f => f.CurrencyCode === this.currency.currencyCode).pop();
      this._setCurrency(currency);
    }
  }

  setCurrencyById() {
    if (this.currency.currencyId !== '') {
      // tslint:disable-next-line:radix
      const currencyId = parseInt(this.currency.currencyId);
      const currency = this.currenciesArray.filter(f => f.CurrencyId === currencyId).pop();
      this._setCurrency(currency);
    }
  }

  _setCurrency(currency) {
    if (currency) {
      this.currency.currencyId = currency.CurrencyId;
      this.currency.currencyCode = currency.CurrencyCode;
      this.currency.currencyName = currency.FullName;
      this.currency.BuyHighRate = currency.BuyHighRate;
      this.currency.BuyLowRate = currency.BuyLowRate;
      this.currency.SellHighRate = currency.SellHighRate;
      this.currency.SellLowRate = currency.SellLowRate;

      this._getStock();
    }
  }

  _getStock() {
    if (this.currency.currencyId !== '') {
      // tslint:disable-next-line:radix
      const currencyId = parseInt(this.currency.currencyId);
      const stock = this.stockArray.filter(f => f.Currencyid === currencyId).pop();

      if (stock) {
        this.lcCurrency = stock.BalanceLc;
        this.fcCurrency = stock.BalanceFc;
      }
    }
  }

}
