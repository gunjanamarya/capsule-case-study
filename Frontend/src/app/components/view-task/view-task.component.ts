import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project.model';
import { Task } from '../../models/Task.model';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [ProjectService, TaskService]
})
export class ViewTaskComponent implements OnInit {

  project: string;
  projects: Project[];
  search_project: string;
  selected_project: string;
  tasks: Task[];

  constructor(private projectService: ProjectService,
    private taskService: TaskService, private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  saveProject() {
    let temp = this.selected_project.split('-');
    this.project = temp[1];
    this.getTasks(temp[0]);
    $('#ProjectModal').modal('hide');
  }


  sort(basis) {
    if (basis == 'startDate') {
      this.tasks.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    } else if (basis == 'endDate') {
      this.tasks.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    } else if (basis == 'Priority') {
      this.tasks.sort((a, b) => +a.priority - +b.priority)
    } else if (basis == 'Completed') {
      this.tasks = this.tasks.filter(task => task.status == 'completed')
    }
  }

  clearFilter() {
    let temp = this.selected_project.split('-')
    this.getTasks(temp[0]);
  }

  getProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    }, error => {
      console.log(error)
    })
  }

  getTasks(id) {
    this.taskService.getTasks(id).subscribe(data => {
      // console.log(data)
      this.tasks = data;
    }, error => {
      console.log(error)
    });
  }

  endTask(id) {
    this.taskService.setTaskAsComplete(id).subscribe(data => {
      this.clearFilter();
    });
  }

  editTask(id) {
    this.router.navigate(['/add-task'], {
      queryParams: {
        taskId: id
      }
    })
  }

}