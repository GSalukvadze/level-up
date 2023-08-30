import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  addUser(user: User) {
    return this.http.post(`${this.apiUrl}`, user)
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.apiUrl}/${id}`, user)
  }
}
