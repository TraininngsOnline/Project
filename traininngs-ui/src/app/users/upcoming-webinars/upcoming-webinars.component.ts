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
      this.webinars = response;
      // this.webinars.forEach(function (arrayItem: any, index: Number) {
      //     arrayItem["index"] = index;
      // });
    }, error => {
      console.log(error);
    })
  }
  get sortByDate() {
    return this.webinars.sort((a: any, b: any) => {
      return <any>new Date(a.date) - <any>new Date(b.date);
    });
  }
  get sortByDatesend() {
    return this.webinars.sort((a: any, b: any) => {
      return <any>new Date(a.date) - <any>new Date(b.date);
    });
  }


  viewDetails(webinar: any) {
    this.router.navigate(['/users/webinar-detail'], {queryParams: {title: webinar.title, id: webinar.id}})
  }

  tConvert(time: any){
      // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
  }

  getAMPM(time: any) {
    return (Number(String(time).substr(0,2)) >= 0 && Number(String(time).substr(0,2)) < 12) ? 'AM' : 'PM';
  }

  isValid(value: any) {
    return Number(value) > 0 && Number(value) !== NaN;
  }

}
