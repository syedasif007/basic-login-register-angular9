import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl = 'http://localhost/TutorialRays/loginRegister/php';

  constructor(private http: HttpClient) { }

  login(loginData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/login.php", loginData);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/insert.php", user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/update.php", user);
  }

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/list.php");
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/getById.php?id=" + id);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/delete.php?id=" + id);
  }
}
