import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/Project.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  base_url = 'http://localhost:3000/';

  constructor(private _http: HttpClient) { }

  addProject(project): Observable<Project> {
    return this._http.post<Project>(this.base_url + 'add-project', project, httpOptions);
  }

  updateProject(project, id): Observable<Project> {
    return this._http.put<Project>(this.base_url + `update-project/${id}`, project, httpOptions);
  }

  getProjects(): Observable<Project[]> {
    return this._http.get<Project[]>(this.base_url + 'get-projects');
  }

  deleteProject(id): Observable<Project> {
    return this._http.delete<Project>(this.base_url + `delete-project/${id}`);
  }

  searchProject(id): Observable<Project> {
    return this._http.get<Project>(this.base_url + `search-project/${id}`);
  }

  getCompletedTasks(id): any {
    return this._http.get<any>(this.base_url + `get-completed-tasks/${id}`);
  }

  getTotalTasks(id): any {
    return this._http.get<any>(this.base_url + `get-projects-with-tasks/${id}`);
  }
}
