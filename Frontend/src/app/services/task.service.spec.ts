import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {

  let injector: TestBed;
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    }).compileComponents().then(() => {
      injector = getTestBed();
      service = injector.get(TaskService);
      httpMock = injector.get(HttpTestingController);
    });
  }));

  afterEach(async(() => {
    // To flush any outstanding requests
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('should post a sub task', () => {

    let child = {
      parentTaskId: '123',
      projectId: '111',
      userId: '121',
      task: "Sample Child Task",
      startDate: "2019-01-10T00:00:00.000Z",
      endDate: "2019-01-11T00:00:00.000Z",
      priority: 10,
      status: "started"
    }

    service.addTask(child).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'POST'
        && request.url == `${service.base_url}add-sub-task`
        && JSON.stringify(request.body) == JSON.stringify(child)
        && request.headers.get('Content-Type') === 'application/json';
    }).flush(child);

  });

  it('should post a parent task', () => {

    let parent = {
      parentTask: "Sample Parent Task",
      projectId: "123"
    }

    service.addParent(parent).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'POST'
        && request.url == `${service.base_url}add-parent-task`
        && JSON.stringify(request.body) == JSON.stringify(parent)
        && request.headers.get('Content-Type') === 'application/json';
    }).flush(parent);

  });

  it('should be able to update priority of task', () => {

    let child = {
      parentTaskId: '123',
      projectId: '111',
      userId: '121',
      task: "Sample Child Task",
      startDate: "2019-01-10T00:00:00.000Z",
      endDate: "2019-01-11T00:00:00.000Z",
      priority: 20,
      status: "started"
    }

    service.editTask(123, child).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'PUT'
        && request.url == `${service.base_url}edit-task/123`
    }).flush(child);

  });

  it('should be able to mark task with id 123 as complete', () => {

    service.setTaskAsComplete(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'PUT'
        && request.url == `${service.base_url}complete-task/123`
    });

  });

  it('should be able to get all tasks', () => {

    service.getTasks(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.base_url}get-tasks/123`
    });

  });

  it('should be able to get all parent tasks', () => {

    service.getParents(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.base_url}get-parent-tasks/123`
    });

  });

  it('should be able to search task with id 123', () => {

    service.searchTask(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.base_url}search-task/123`
    });

  });

});
