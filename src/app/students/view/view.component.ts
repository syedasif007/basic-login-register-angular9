import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  users: any;
  token: any;

  constructor(
    private apiService: ServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token');

    this.apiService.getUsers()
      .subscribe((data: any) => {
        this.users = data;
      })
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  edit(user: User): void {
    this.router.navigate(['edit/' + user.id]);
  }

  logOut() {
    window.localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
