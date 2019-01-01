import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParentTask, Task } from '../models/Task.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  base_url = 'http://localhost:3000/';

  constructor(private _http: HttpClient) { }

  addParent(parent): Observable<ParentTask> {
    return this._http.post<ParentTask>(this.base_url + 'add-parent-task', parent, httpOptions);
  }

  getParents(): Observable<ParentTask[]> {
    return this._http.get<ParentTask[]>(this.base_url + 'get-parent-tasks');
  }

  addTask(task): Observable<Task> {
    return this._http.post<Task>(this.base_url + 'add-sub-task', task, httpOptions);
  }
}