import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClarityIcons, userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon, employeeIcon, eventIcon, shareIcon, microphoneIcon,headphonesIcon,errorStandardIcon } from '@cds/core/icon';
ClarityIcons.addIcons(userIcon,clockIcon,alarmClockIcon,assignUserIcon,dollarIcon,employeeIcon,eventIcon,shareIcon,microphoneIcon,headphonesIcon,errorStandardIcon);


@Component({
  selector: 'app-detailed-webinar',
  templateUrl: './detailed-webinar.component.html',
  styleUrls: ['./detailed-webinar.component.scss']
})
export class DetailedWebinarComponent implements OnInit {
  webinar: any = {};
  isGroupCollapsed = true;
  isLiveCollapsed = true;
  isRecordCollapsed = true;
  id: string = '';
  showError: boolean = false;
  webinarForm!: FormGroup;
  constructor(private readonly activeRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly fb: FormBuilder) { 
    }

  ngOnInit(): void {
    this.initForm();
    this.id = this.activeRoute.snapshot.params.id.split("_").pop();
    
    this.getWebinarDetails();
  }

  initForm() {
    this.webinarForm = this.fb.group({
      paymentFor: []
    });
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

  getWebinarDetails() {
    if (this.id) {
      const params = `id/${this.id}/false`;
      this.usersService.getWebinars(params).subscribe(response => {
        this.webinar = response[0];
        const paymentFor = this.webinar.webinarType === 'upcoming' ? 'liveOneAttendeePrice' : 'recOneAttendeePrice';
        this.webinarForm.get('paymentFor')!.patchValue(paymentFor);
        // const lastIndex = this.activeRoute.snapshot.params.id.lastIndexOf("_");
        // const url = this.activeRoute.snapshot.params.id.substring(0, lastIndex)

        // this.router.navigate([`/users/webinar-detail/${url}_${this.webinar.webinarLink}`])

      }, error => {
        console.log(error);
      })
    }
  }

  addToCart() {
    if (localStorage.getItem('token')) {
      // const payload = {
      //   paymentFor: 'recOneAttendeePrice'
      // };
      const payload = this.webinarForm.value;
      this.usersService.addToCart(this.id, payload).subscribe(response => {
        this.usersService.addedToCart.next(1);
        this.router.navigate(['/users/cart']);
      }, error => {
        console.log(error);
      });
    } else {
      this.usersService.showLogin.next(true);
      // this.showError = true;
      // setTimeout(() => {
      //   this.showError = false;
      // }, 3000);
    }
  }

  isValid(value: any) {
    return Number(value) > 0 && Number(value) !== NaN;
  }

  getAMPM(time: any) {
    return (Number(String(time).substr(0,2)) >= 0 && Number(String(time).substr(0,2)) < 12) ? 'AM' : 'PM';
  }

  checkToggle(type: any) {
     if(type === 'live') {
      this.isRecordCollapsed = true;
    } else {
      this.isLiveCollapsed = true;
    }
  }

}
