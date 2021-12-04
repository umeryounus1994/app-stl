import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../services/helper/helper.service';
import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { RestApiService } from '../../../services/api/rest-api.service';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  lastRefreshed;


  total_categories;
  total_sub_categories;
  total_items;

  constructor(private helper: HelperService,  private api: RestApiService) { }

  ngOnInit() {
    this.lastRefreshed = this.helper.getCurrentTime();
  
    this.getAllCategories();
    this.getAllSubCategories();
    this.getAllItem(); 
  }


  getAllCategories() {
    this.api.get('category/get_all').then((result: any) => {
      this.total_categories=result.data.length;
      console.log("total category"+this.total_categories);
    }).catch(err => console.log('Error', err));
  }

  getAllSubCategories() {
    this.api.get('sub_category/get_all').then((result: any) => {
      this.total_sub_categories=result.data.length;
      console.log("total sub categories"+this.total_sub_categories);
    }).catch(err => console.log('Error', err));
  }

  getAllItem() {
    this.api.get('item/get_all').then((result: any) => {
      this.total_items=result.data.length;
      console.log("total items"+this.total_items);
    }).catch(err => console.log('Error', err));
  }

}
