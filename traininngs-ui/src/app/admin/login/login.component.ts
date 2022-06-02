import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminForm: FormGroup = this.initAdminForm();

  constructor(private readonly router: Router, private readonly toaster: ToasterService,
    private readonly fb: FormBuilder, private readonly adminService: AdminService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.adminForm.valid) {
      this.adminService.login(this.adminForm.value).subscribe(response => {
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.data.username);
        this.toaster.success(response.message);
        this.router.navigate(['/admin/home/create-webinar']);
      }, error => {
        this.toaster.error('Invalid Credentials');
      })
    } else {
      this.toaster.error('Fill all mandatory fields');
    }
  }

  initAdminForm() {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
