import { FilterParentTaskPipe } from './filter-parent-task.pipe';

describe('FilterParentTaskPipe', () => {

  let parents = [
    {
      parentTask: "Demo",
      projectId: "123"
    },
    {
      parentTask: "Sample",
      projectId: "13"
    }]
  it('create an instance', () => {
    const pipe = new FilterParentTaskPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty list', () => {
    const pipe = new FilterParentTaskPipe();
    expect(pipe.transform(null, 'sam')).toEqual([])
  });

  it('should return all parent tasks', () => {
    const pipe = new FilterParentTaskPipe();
    expect(pipe.transform(parents, null)).toEqual(parents)
  });

  it('should return all parent tasks', () => {
    const pipe = new FilterParentTaskPipe();
    expect(pipe.transform(parents, 'sam')).toEqual([{
      parentTask: "Sample",
      projectId: "13"
    }])
  });

});
