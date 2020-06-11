import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;
  loggedIn = false;
  message: any;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ServicesService
  ) { }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token');
    // console.log(this.token);

    // if (this.loggedIn || this.token !== null) {
    if (this.token !== null) {
      this.router.navigate(['view']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };

    this.apiService.login(loginData)
      .subscribe((data: any) => {
        this.message = data.message;

        if (data.token) {
          window.localStorage.setItem('token', data.token);
          this.loggedIn = true;
          this.router.navigate(['view']);
        } else {
          this.invalidLogin = true;
          // alert(data.message);
        }
      });
  }

}
