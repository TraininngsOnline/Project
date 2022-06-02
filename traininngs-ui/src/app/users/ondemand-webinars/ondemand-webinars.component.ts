import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ClarityIcons, userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon } from '@cds/core/icon';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
ClarityIcons.addIcons(userIcon,clockIcon,alarmClockIcon,assignUserIcon,dollarIcon);
// declare var $: any;

@Component({
  selector: 'app-ondemand-webinars',
  templateUrl: './ondemand-webinars.component.html',
  styleUrls: ['./ondemand-webinars.component.scss']
})
export class OndemandWebinarsComponent implements OnInit {
  webinars: any = [];
  baseUrl: string = '';

  constructor(private readonly usersService: UsersService, private readonly router: Router) { }

  ngOnInit(): void {
    this.baseUrl = environment.baseUrl;
    this.getUpcomingWebinars();
  }

  getUpcomingWebinars() {
    const params = 'webinarType/ondemand/4';
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

  ngAfterViewChecked(): void {
  }

  getAMPM(time: any) {
    return (Number(String(time).substr(0,2)) >= 0 && Number(String(time).substr(0,2)) < 12) ? 'AM' : 'PM';
  }
  

  isValid(value: any) {
    return Number(value) > 0 && Number(value) !== NaN;
  }
  
}
