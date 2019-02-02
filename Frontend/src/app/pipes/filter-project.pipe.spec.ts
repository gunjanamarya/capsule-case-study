import { FilterProjectPipe } from './filter-project.pipe';

describe('FilterProjectPipe', () => {

  let project = [{
    endDate: "2019-01-11T00:00:00.000Z",
    priority: 16,
    project: "Demo Project",
    startDate: "2019-01-10T00:00:00.000Z",
    userId: "123",
  },
  {
    endDate: "2019-01-11T00:00:00.000Z",
    priority: 26,
    project: "Sample Project",
    startDate: "2019-01-10T00:00:00.000Z",
    userId: "123",
  }];

  it('create an instance', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty list', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe.transform(null, 'sam')).toEqual([]);
  });

  it('should return all projects', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe.transform(project, null)).toEqual(project);
  });

  it('should return filtered projects', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe.transform(project, 'sample', 'name')).toEqual([{
      endDate: "2019-01-11T00:00:00.000Z",
      priority: 26,
      project: "Sample Project",
      startDate: "2019-01-10T00:00:00.000Z",
      userId: "123",
    }])
  });

  it('should return filtered projects', () => {
    const pipe = new FilterProjectPipe();
    expect(pipe.transform(project, '26')).toEqual([{
      endDate: "2019-01-11T00:00:00.000Z",
      priority: 26,
      project: "Sample Project",
      startDate: "2019-01-10T00:00:00.000Z",
      userId: "123",
    }])
  });


});

// transform(projects: any[], searchText: string, criteria ?: string): any {
//   if (!projects) return [];
//   if (!searchText) return projects;
//   searchText = searchText.toLowerCase();
//   if (criteria == 'name') {
//     return projects.filter(project => {
//       return (project.project.toLowerCase().includes(searchText));
//     })
//   }
//   return projects.filter(project => {
//     return (project.project.toLowerCase().includes(searchText) ||
//       (project.priority + "").includes(searchText) ||
//       (project.startDate + "").includes(searchText) ||
//       (project.endDate + "").includes(searchText)
//     );
//   });
// }
