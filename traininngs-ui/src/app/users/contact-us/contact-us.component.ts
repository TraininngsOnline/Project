import { Component, OnInit } from '@angular/core';
import { ClarityIcons, userIcon, clockIcon, alarmClockIcon, assignUserIcon, dollarIcon,filterIcon, phoneHandsetIcon, envelopeIcon, mapMarkerIcon } from '@cds/core/icon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';
ClarityIcons.addIcons(userIcon,clockIcon,alarmClockIcon,assignUserIcon,dollarIcon,filterIcon,phoneHandsetIcon,envelopeIcon,mapMarkerIcon);
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly usersService: UsersService,
    private readonly toaster: ToasterService, private readonly router: Router) { 
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  sendMessage() {
    if (this.formGroup.valid) {
      this.usersService.sendRequest(this.formGroup.value).subscribe(response => {
        this.toaster.success('Sent Successfully');
        this.router.navigate(['/users/'])
      }, error => {
        this.toaster.error('Error sending message');
        console.log(error);
      })
    } else {
    }
  }

}
