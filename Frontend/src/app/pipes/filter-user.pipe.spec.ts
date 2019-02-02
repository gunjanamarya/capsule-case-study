import { FilterUserPipe } from './filter-user.pipe';

describe('FilterUserPipe', () => {
  let users = [{
    firstName: "stephan",
    lastName: "jones",
    employeeId: "233"
  }, {
    firstName: "tyler",
    lastName: "jones",
    employeeId: "33"
  }];
  it('create an instance', () => {
    const pipe = new FilterUserPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return empty list', () => {
    const pipe = new FilterUserPipe();
    expect(pipe.transform(null, 'sam')).toEqual([])
  });

  it('should return all users', () => {
    const pipe = new FilterUserPipe();
    expect(pipe.transform(users, null)).toEqual(users)
  });

  it('should return filtered user', () => {
    const pipe = new FilterUserPipe();
    expect(pipe.transform(users, 'tyler')).toEqual([{
      firstName: "tyler",
      lastName: "jones",
      employeeId: "33"
    }])
  });
});
