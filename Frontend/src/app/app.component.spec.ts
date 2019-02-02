import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { routes } from './app-routing.module';

import { FilterProjectPipe } from './pipes/filter-project.pipe';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { FilterParentTaskPipe } from './pipes/filter-parent-task.pipe';


describe('AppComponent', () => {

  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        AddProjectComponent,
        AddTaskComponent,
        AddUserComponent,
        ViewTaskComponent,
        FilterProjectPipe,
        FilterParentTaskPipe,
        FilterUserPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      router = TestBed.get(Router);
      location = TestBed.get(Location);

      fixture = TestBed.createComponent(AppComponent);
      router.initialNavigation();
    })
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Frontend');
  });

  // specs to test app routing

  it('navigate to "View Task" redirects you to /view-task', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/view-task');
  }));

  it('navigate to "Add Task" takes you to /add-task', fakeAsync(() => {
    router.navigate(['/add-task']);
    tick();
    expect(location.path()).toBe('/add-task');
  }));

  it('navigate to "Add Project" takes you to /add-project', fakeAsync(() => {
    router.navigate(['/add-project']);
    tick();
    expect(location.path()).toBe('/add-project');
  }));

  it('navigate to "Add User" takes you to /add-user', fakeAsync(() => {
    router.navigate(['/add-user']);
    tick();
    expect(location.path()).toBe('/add-user');
  }));


});
