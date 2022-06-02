import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {

  navItems: any = [
    { title: 'Create Webinar', routerLink: '/admin/home/create-webinar' },
    { title: 'Webinars List', routerLink: '/admin/home/webinars-list' },
    { title: 'Create Category', routerLink: '/admin/home/category' },
    { title: 'Category List', routerLink: '/admin/home/category-list' },
    // { title: 'Create Webinar Type', routerLink: '/admin/home/webinar-type' },
    { title: 'Webinar Type List', routerLink: '/admin/home/webinar-type-list' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
