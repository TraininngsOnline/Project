import { Component, OnInit, Input } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { ClarityIcons, downloadIcon } from '@cds/core/icon';

import { MarketingManagerService } from '../services/marketing-manager.service';
ClarityIcons.addIcons(downloadIcon);

import { ClrDatagridComparatorInterface } from '@clr/angular';

class PokemonComparator implements ClrDatagridComparatorInterface<any> {
  compare(a: any, b: any) {
    console.log(a, b);
    return a.pokemon.number - b.pokemon.number;
  }
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() config: any;
  items: any = [];
  public pokemonComparator = new PokemonComparator();

  constructor(private readonly mmService: MarketingManagerService) { }

  ngOnInit(): void {
    this.mmService.getItems(this.config.url).subscribe(response => {
      console.log(response);
      this.items = response;
    }, error => {
      console.log(error);
    })
  }

  download() {
      const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Report',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.items);
  }

}
