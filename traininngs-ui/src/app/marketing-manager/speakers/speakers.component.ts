import { Component, OnInit } from '@angular/core';
import { urls } from '../../urls/urls';
import { ExportToCsv } from 'export-to-csv';
import { ClarityIcons, checkIcon, timesIcon } from '@cds/core/icon';

import { MarketingManagerService } from '../services/marketing-manager.service';
ClarityIcons.addIcons(checkIcon, timesIcon);

import { ClrDatagridComparatorInterface } from '@clr/angular';
import { ToasterService } from 'src/app/services/toaster.service';

class PokemonComparator implements ClrDatagridComparatorInterface<any> {
  compare(a: any, b: any) {
    console.log(a, b);
    return a.pokemon.number - b.pokemon.number;
  }
}

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit {

  speakers: any = [];
  public pokemonComparator = new PokemonComparator();

  constructor(private readonly mmService: MarketingManagerService, private readonly toaster: ToasterService) { }

  ngOnInit(): void {
    this.getSpeakers();
  }

  getSpeakers() {
    this.mmService.getSpeakers().subscribe(response => {
      console.log(response);
      this.speakers = response.Items;
    }, error => {
      console.log(error);
    })
  }

  action(speaker: any, type: string) {
    const payload = {
      id: speaker.id,
      status: type
    };
    this.mmService.updateSpeaker(payload).subscribe(response => {
      this.toaster.success('');
      this.getSpeakers();
    }, error => {
      this.toaster.error('');
    });
  }

}
