import { Component, OnInit } from '@angular/core';
import { ClarityIcons, userIcon } from '@cds/core/icon';
import { Router } from '@angular/router';

ClarityIcons.addIcons(userIcon);

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  open: boolean = false;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/admin']);
  }

}
