import { UserService } from './user.service';
import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {

  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    }).compileComponents().then(() => {
      injector = getTestBed();
      service = injector.get(UserService);
      httpMock = injector.get(HttpTestingController);
    });
  }));

  afterEach(async(() => {
    // To flush any outstanding requests
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should post a User', () => {

    let user = {
      firstName: "stephan king",
      lastName: "jones",
      employeeId: "2333"
    }

    service.addUser(user).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'POST'
        && request.url == `${service.base_url}add-user`
        && JSON.stringify(request.body) == JSON.stringify(user)
        && request.headers.get('Content-Type') === 'application/json';
    }).flush(user);

  });

  it('should be able to update employee id of user', () => {

    let user = {
      firstName: "stephan king",
      lastName: "jones",
      employeeId: "23"
    }

    service.updateUser(user, 123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'PUT'
        && request.url == `${service.base_url}update-user/123`
    }).flush(user);

  });

  it('should be able to delete user with id 123', () => {

    service.deleteUser(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'DELETE'
        && request.url == `${service.base_url}delete-user/123`
    });

  });

  it('should be able to search user with id 123', () => {

    service.searchUser(123).subscribe();

    httpMock.expectOne((request) => {
      return request.method == 'GET'
        && request.url == `${service.base_url}search-user/123`
    });

  });


});
