import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ClarityIcons, userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon } from '@cds/core/icon';

import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
ClarityIcons.addIcons(userIcon,clockIcon,alarmClockIcon,assignUserIcon,dollarIcon);

@Component({
  selector: 'app-upcoming-webinars',
  templateUrl: './upcoming-webinars.component.html',
  styleUrls: ['./upcoming-webinars.component.scss']
})
export class UpcomingWebinarsComponent implements OnInit {

  webinars: any = [];
  baseUrl: string = '';

  constructor(private readonly usersService: UsersService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getUpcomingWebinars();
    this.baseUrl = environment.baseUrl;
  }

  getUpcomingWebinars() {
    const params = 'webinarType/upcoming/4';
    this.usersService.getWebinars(params).subscribe(response => {
      console.log(response);
      this.webinars = response;
    }, error => {
      console.log(error);
    })
  }

  viewDetails(webinar: any) {
    this.router.navigate(['/users/webinar-detail'], {queryParams: {title: webinar.title, id: webinar.id}})
  }

  getAMPM(time: any) {
    return (Number(String(time).substr(0,2)) >= 0 && Number(String(time).substr(0,2)) < 12) ? 'AM' : 'PM';
  }

  isValid(value: any) {
    return Number(value) > 0 && Number(value) !== NaN;
  }

}
