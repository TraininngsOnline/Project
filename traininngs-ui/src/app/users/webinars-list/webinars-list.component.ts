import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { environment } from '../../../environments/environment';

import { ClarityIcons, userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon,filterIcon } from '@cds/core/icon';
import { FormGroup, FormBuilder } from '@angular/forms';
ClarityIcons.addIcons(userIcon,clockIcon,alarmClockIcon,assignUserIcon,dollarIcon,filterIcon);

@Component({
  selector: 'app-webinars-list',
  templateUrl: './webinars-list.component.html',
  styleUrls: ['./webinars-list.component.scss']
})
export class WebinarsListComponent implements OnInit {

  webinars: any = [];
  webinarPriceType: string = '';
  disWebinarPriceType: string = '';
  formGroup!: FormGroup;
  webinarCats: any = [];
  unfilteredWebinars: any = [];
  baseUrl: string = '';

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly router: Router, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(value => {
      console.log(value.get('type'));
      const webinarType = value.get('type') || '';
      this.getUpcomingWebinars(webinarType);
    });
    this.getCategories();
    this.initForm();
  }

  initForm() {
    this.baseUrl = environment.baseUrl;
    this.formGroup = this.fb.group({
      title: '',
      category: ''
    });
  }

  getCategories() {
    this.usersService.getCategories().subscribe((response: any) => {
      this.webinarCats = response.Items;
    }, error => {
      console.log(error);
    })
  }

  getUpcomingWebinars(type: string) {
    const params = `webinarType/${type}/all`;
    this.usersService.getWebinars(params).subscribe((response: any) => {
      console.log(response);
      this.webinars = response;
      this.unfilteredWebinars = [...response];
      this.webinarPriceType = type === 'ondemand' ? 'recOneAttendeePrice': 'liveOneAttendeePrice';
      this.disWebinarPriceType = `dis${this.webinarPriceType}`;
    }, error => {
      console.log(error);
    })
  }

  viewDetails(webinar: any) {
    this.router.navigate(['/users/webinar-detail'], {queryParams: {title: webinar.title, id: webinar.id}})
  }

  filter() {
    const formValue = this.formGroup.value;
    // const filteredValues = [];
    this.webinars = []
    this.unfilteredWebinars.map((webinar: any) => {
      let index = 0;
      if (formValue.title) {
        index++;
        if (webinar.title.toLowerCase().includes(formValue.title.toLowerCase())) {
          index = index+3
        }
      }
      if (formValue.category) {
        index++;
        if (webinar.category === formValue.category) {
          index = index+3
        }
      }
      if(!index || (index > 2 && (index % 2 === 0))) {
        this.webinars.push(webinar);
      }
    });
    console.log(this.webinars);
  }

  getAMPM(time: any) {
    return (Number(String(time).substr(0,2)) >= 0 && Number(String(time).substr(0,2)) < 12) ? 'AM' : 'PM';
  }

  isValid(value: any) {
    return Number(value) > 0 && Number(value) !== NaN;
  }

}
