import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServicesService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.routes.snapshot.params;

    this.editForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });

    this.apiService.getUserById(routeParams.id)
      .subscribe((data: any) => {
        this.editForm.patchValue(data);
      });
  }

  onUpdate() {
    // console.log(this.editForm.value);

    this.apiService.updateUser(this.editForm.value)
      .subscribe(data => {
        this.router.navigate(['view']);
      },
        error => {
          alert(error);
        });
  }

}
