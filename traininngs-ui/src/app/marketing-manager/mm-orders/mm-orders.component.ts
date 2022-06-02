import { Component, OnInit } from '@angular/core';
import { urls } from '../../urls/urls';

@Component({
  selector: 'app-mm-orders',
  templateUrl: './mm-orders.component.html',
  styleUrls: ['./mm-orders.component.scss']
})
export class MmOrdersComponent implements OnInit {

  config: any = {
    title: 'Orders Report',
    url: urls.getOrders
  };
  constructor() { }

  ngOnInit(): void {
  }

}
