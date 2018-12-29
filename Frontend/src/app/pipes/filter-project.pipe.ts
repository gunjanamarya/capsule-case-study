import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {

  transform(projects: any[], searchText: string): any {
    if (!projects) return [];
    if (!searchText) return projects;
    searchText = searchText.toLowerCase();
    return projects.filter(project => {
      return (project.project.toLowerCase().includes(searchText) ||
        (project.priority + "").includes(searchText) ||
        (project.startDate + "").includes(searchText) ||
        (project.endDate + "").includes(searchText)
      );
    });
  }

}
