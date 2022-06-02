import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';
import { UsersService } from '../services/users.service';
import '@cds/core/icon/register.js';
import { ClarityIcons, windowCloseIcon } from '@cds/core/icon';

ClarityIcons.addIcons(windowCloseIcon);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() userConfig: any;
  formGroup: FormGroup;
  login = true;

  constructor(private readonly fb: FormBuilder,
    private readonly toasterService: ToasterService,
    private readonly usersService: UsersService) { 
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit(type: string) {
    if (this.formGroup.valid) {
      if (type === 'login') {
        this.loginFunc();
      } else {
        this.signupFunc();
      }
    } else {
      this.toasterService.error('please fill all fields');
    }
  }

  loginFunc() {
    this.usersService.login(this.formGroup.value).subscribe(response => {
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('token', response.token);
      this.toasterService.success(response.message);
      this.usersService.isLoggedIn.next(true);
      this.userConfig.showLoginPopup = false;
      this.usersService.addedToCart.next(response.data.cart);
    }, error => {
      this.toasterService.error('Invalid Credentials');
    });
  };

  signupFunc() {
    this.usersService.signup(this.formGroup.value).subscribe(response => {
      this.toasterService.success(response.message);
      this.toggle();
    }, error => {
      this.toasterService.error('Error while signup');
    });
  }

  initLoginForm() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  initSignupForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      company: ['', Validators.required],
      role: ['user']
    });
  }

  toggle() {
    this.login = !this.login;
    if (this.login) {
      this.initLoginForm();
    } else {
      this.initSignupForm();
    }
  }

  close() {
    this.userConfig.showLoginPopup = false;
  }

}
