import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  token:any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token');

    // if (!this.token) {
    //   this.router.navigate(['login']);
    // }

    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  onSubmit() {
    // console.log(this.addForm.value);

    this.apiService.createUser(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['view']);
      });
  }

  logOut() {
    window.localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
