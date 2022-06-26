import { Component, OnInit } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { UsersService } from '../services/users.service';
import { ClarityIcons, downloadIcon } from '@cds/core/icon';

ClarityIcons.addIcons(downloadIcon);

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders=[];
  
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserOrderDetails().subscribe(res => this.orders = res);
  }

  download() {
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'My Orders',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: ['Date','UserID','Status','Username','Amount', 'Order No']
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(this.orders);
}

}
