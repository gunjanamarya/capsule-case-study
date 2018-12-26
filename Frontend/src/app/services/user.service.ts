import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  base_url = 'http://localhost:3000/';
  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.base_url + 'get-users')
  }

  addUser(user): Observable<User> {
    return this._http.post<User>(this.base_url + 'add-user', user, httpOptions)
  }

  updateUser(user, id): Observable<User> {
    return this._http.put<User>(this.base_url + `update-user/${id}`, user, httpOptions)
  }

  deleteUser(id): Observable<any> {
    return this._http.delete<any>(this.base_url + `delete-user/${id}`)
  }

  searchUser(id): Observable<User> {
    return this._http.get<User>(this.base_url + `search-user/${id}`)
  }

}