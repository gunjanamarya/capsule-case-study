import { ProjectService } from './project.service';
import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProjectService', () => {

  let injector: TestBed;
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    }).compileComponents().then(() => {
      injector = getTestBed();
      service = injector.get(ProjectService);
      httpMock = injector.get(HttpTestingController);
    });
  }));

  afterEach(async(() => {
    // To flush any outstanding requests
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('should post a Project', () => {

    let project = {
      endDate: "2019-01-11T00:00:00.000Z",
      priority: 26,
      project: "Demo Project",
      startDate: "2019-01-10T00:00:00.000Z",
      userId: "123",
    }

    service.addProject(project).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'POST'
        && request.url == `${service.base_url}add-project`
        && JSON.stringify(request.body) == JSON.stringify(project)
        && request.headers.get('Content-Type') === 'application/json';
    }).flush(project);

  });

  it('should be able to update priority of project', () => {

    let project = {
      endDate: "2019-01-11T00:00:00.000Z",
      priority: 2,
      project: "Demo Project",
      startDate: "2019-01-10T00:00:00.000Z",
      userId: "123",
    }

    service.updateProject(project, 123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'PUT'
        && request.url == `${service.base_url}update-project/123`
    }).flush(project);

  });

  it('should be able to delete project with id 123', () => {

    service.deleteProject(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'DELETE'
        && request.url == `${service.base_url}delete-project/123`
    });

  });

  it('should be able to search project with id 123', () => {

    service.searchProject(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.base_url}search-project/123`
    });
  });

  it('should be able to get all completed tasks of project with id 123', () => {

    service.getCompletedTasks(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.base_url}get-completed-tasks/123`
    });
  });

  it('should be able to get all tasks of project with id 123', () => {

    service.getTotalTasks(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.base_url}get-projects-with-tasks/123`
    });

  });
});
