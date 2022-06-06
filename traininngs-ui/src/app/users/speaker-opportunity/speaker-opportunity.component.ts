import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speaker-opportunity',
  templateUrl: './speaker-opportunity.component.html',
  styleUrls: ['./speaker-opportunity.component.scss']
})
export class SpeakerOpportunityComponent implements OnInit {

  formGroup!: FormGroup

  constructor(private readonly fb: FormBuilder, private readonly usersService: UsersService,
    private readonly toaster: ToasterService, private readonly router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      designation: ['', Validators.required],
      experience: ['', Validators.required],
      profile: ['', Validators.required]
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.usersService.addSpeaker(this.formGroup.value).subscribe((response) => {
        this.toaster.success('');
        this.router.navigate(['/users'])
      }, (error) => {
        this.toaster.error('');
        console.log(error);
      });
    } else {
      // const ctrls = ['name', 'email', 'phoneNumber', 'designation', 'experience', 'profile'];
      // ctrls.forEach((ctrl: string) => {
      //   this.formGroup.get(ctrl)!.markAllAsTouched();
      // })
      this.formGroup.markAllAsTouched();
    }
  }

  isInvalid(control: string) {
    return this.formGroup.get(control)!.touched && this.formGroup.get(control)!.invalid;
  }

}
