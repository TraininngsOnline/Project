import { Component, OnInit } from '@angular/core';
import { urls } from '../../urls/urls';
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
  selector: 'app-signup-users',
  templateUrl: './signup-users.component.html',
  styleUrls: ['./signup-users.component.scss']
})
export class SignupUsersComponent implements OnInit {

  users: any = [];
  public pokemonComparator = new PokemonComparator();

  constructor(private readonly mmService: MarketingManagerService) { }

  ngOnInit(): void {
    this.mmService.getItems(urls.getUsers).subscribe(response => {
      console.log(response);
      this.users = response;
    }, error => {
      console.log(error);
    })
  }


}
