import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mm-side-nav',
  templateUrl: './mm-side-nav.component.html',
  styleUrls: ['./mm-side-nav.component.scss']
})
export class MmSideNavComponent implements OnInit {

  sideNav = [
    { label: 'Orders', router: '/marketing-manager/home/orders' },
    { label: 'Users', router: '/marketing-manager/home/users' },
    { label: 'Speakers', router: '/marketing-manager/home/speakers' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
