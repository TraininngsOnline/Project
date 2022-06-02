import { Component, OnInit } from '@angular/core';
import { ClarityIcons, userIcon } from '@cds/core/icon';
import { Router } from '@angular/router';

ClarityIcons.addIcons(userIcon);

@Component({
  selector: 'app-mm-home',
  templateUrl: './mm-home.component.html',
  styleUrls: ['./mm-home.component.scss']
})
export class MmHomeComponent implements OnInit {

  open: boolean = false;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/marketing-manager/login']);
  }

}
