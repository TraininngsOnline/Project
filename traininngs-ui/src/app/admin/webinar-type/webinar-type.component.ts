import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-webinar-type',
  templateUrl: './webinar-type.component.html',
  styleUrls: ['./webinar-type.component.scss']
})
export class WebinarTypeComponent implements OnInit {

  webinarTypeForm !: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly adminService: AdminService,
    private readonly toaster: ToasterService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.webinarTypeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  save() {
    if (this.webinarTypeForm.valid) {
      this.adminService.saveWebinarType(this.webinarTypeForm.value).subscribe(response => {
        this.toaster.success('Webinar Type Saved');
      }, error => {
        this.toaster.error('Error while Saving');
      })
    }
  }

}
