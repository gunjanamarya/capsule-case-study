import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { TitleCasePipe } from '@angular/common';
import { User } from '../../models/User.model';
import { Project } from '../../models/Project.model';
import { ParentTask } from '../../models/Task.model';
import { Task } from '../../models/Task.model';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [UserService, ProjectService, TaskService, TitleCasePipe]
})
export class AddTaskComponent implements OnInit {

  task_id: string;
  addTaskForm: FormGroup;
  today: Date;
  tomorrow: Date;
  projects: Project[];
  users_list: User[];
  parents_list: ParentTask[];
  search_project: string;
  selected_project: string;
  search_parent: string;
  selected_parent: string;
  search_user: string;
  selected_user: string;
  error: string;
  editable: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private titleCasePipe: TitleCasePipe,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    }, error => {
      console.log(error)
    })
    this.userService.getUsers().subscribe(data => {
      this.users_list = data;
    }, error => {
      console.log(error)
    })
    this.setDefaultDate()
    this.createForm();

    this.task_id = this.route.snapshot.queryParamMap.get('taskId');
    if (this.task_id) {
      this.editable = true;
      this.taskService.searchTask(this.task_id).subscribe(data => {
        console.log(data)
        //TO DO
        this.addTaskForm.patchValue({
          task: data[0].task,
          priority: data[0].priority,
          ifParent: false,
          parentTask: data[0].parentTaskId ? data[0].parentTaskId['parentTask'] : null,
          startDate: this.dateFormatter(new Date(data[0].startDate), 'yyyy-MM-dd'),
          endDate: this.dateFormatter(new Date(data[0].endDate), 'yyyy-MM-dd'),
        })
        this.projectService.searchProject(data[0].projectId).subscribe(result => {
          this.addTaskForm.patchValue({
            project: result[0].project
          })
          this.selected_project = result[0]._id + '-' + result[0].project
          this.getParentTasks(result[0]._id);
        })
        this.userService.searchUser(data[0].userId).subscribe(res => {
          this.addTaskForm.patchValue({
            user: res[0].firstName + ' ' + res[0].lastName
          })
          this.selected_user = res[0]._id + '-' + res[0].firstName + ' ' + res[0].lastName
        })
        this.addTaskForm.get('ifParent').disable();
        this.selected_parent = data[0].parentTaskId ? data[0].parentTaskId['_id'] + '-' + data[0].parentTaskId['parentTask'] : null
      })
    }
  }

  setDefaultDate() {
    let date1 = new Date();
    let date2 = new Date(date1.setDate(date1.getDate() + 1));
    this.today = this.dateFormatter(new Date(), 'yyyy-MM-dd');
    this.tomorrow = this.dateFormatter(date2, 'yyyy-MM-dd');
  }

  dateFormatter(date: Date, format: string): any {
    if (!date) { return null; }
    return new DatePipe("en-US").transform(date, format);
  }

  createForm() {
    this.addTaskForm = this.fb.group({
      project: [{ value: null, disabled: true }, Validators.required],
      task: [null, Validators.required],
      ifParent: false,
      priority: [0, Validators.required],
      parentTask: [{ value: null, disabled: true }],
      startDate: [this.today, Validators.required],
      endDate: [this.tomorrow, Validators.required],
      user: [{ value: null, disabled: true }, Validators.required]
    }, { validator: this.DateValidator() });
  }

  resetForm() {
    this.error = null;
    this.search_project = null;
    this.selected_project = null;
    this.search_parent = null;
    this.selected_parent = null;
    this.search_user = null;
    this.selected_user = null;
    this.editable = false;
    this.addTaskForm.reset({
      priority: 0,
      ifParent: false,
      startDate: this.today,
      endDate: this.tomorrow
    });
    this.addTaskForm.get('priority').enable();
    this.addTaskForm.get('startDate').enable();
    this.addTaskForm.get('endDate').enable();
    this.addTaskForm.get('ifParent').enable();
  }

  DateValidator() {
    return (group: FormGroup): { [key: string]: any } => {
      let startDate = new Date(group.controls["startDate"].value);
      let endDate = new Date(group.controls["endDate"].value);
      let today = new Date(new DatePipe("en-US").transform(new Date(), 'yyyy-MM-dd'));
      if ((endDate.getTime() < startDate.getTime()) || (startDate.getTime() < today.getTime())) {
        return {
          dates: "Start/End date is incorrect"
        };
      }
      return {};
    }
  }

  saveProject() {
    this.clearParent();
    let temp = this.selected_project.split('-')
    this.addTaskForm.patchValue({
      "project": temp[1].trim()
    });
    this.getParentTasks(temp[0]);
  }

  getParentTasks(id) {
    this.taskService.getParents(id).subscribe(data => {
      this.parents_list = data;
      this.parents_list = this.parents_list.filter(parent =>
        parent.projectId == id
      )
      $('#ProjectModal').modal('hide');
    }, error => {
      console.log(error)
    })
  }

  saveParent() {
    let temp = this.selected_parent.split('-')
    this.addTaskForm.patchValue({
      "parentTask": temp[1].trim()
    });
    $('#ParentModal').modal('hide');
  }

  saveUser() {
    let temp = this.selected_user.split('-')
    this.addTaskForm.patchValue({
      "user": temp[1].trim()
    });
    $('#UserModal').modal('hide');
  }

  formStatusValid() {
    if (this.addTaskForm.get('ifParent').value == 'true') {
      return !this.addTaskForm.valid || this.addTaskForm.get('project').value
    } else {
      console.log('here', !this.addTaskForm.valid ||
        !this.addTaskForm.get('project').value || this.addTaskForm.get('parentTask').value ||
        !this.addTaskForm.get('user').value)
      return !this.addTaskForm.valid ||
        !this.addTaskForm.get('project').value || this.addTaskForm.get('parentTask').value ||
        !this.addTaskForm.get('user').value
    }
  }

  onAdd() {
    if (this.addTaskForm.get('ifParent').value) {
      console.log('Parent task')
      var parentTask = new ParentTask();
      parentTask.projectId = this.selected_project.split('-')[0].trim()
      parentTask.parentTask = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
      this.taskService.addParent(parentTask).subscribe(data => {
        this.resetForm();
        this.error = null;
      }, error => {
        this.error = 'Atleast one of the field has error !!';
        console.log(error)
      })
    } else {
      // console.log('Child task')
      var subTask = new Task();
      subTask.projectId = this.selected_project.split('-')[0].trim();
      subTask.userId = this.selected_user.split('-')[0].trim()
      subTask.parentTaskId = this.selected_parent ? this.selected_parent.split('-')[0].trim() : null;
      subTask.priority = this.addTaskForm.get('priority').value;
      subTask.startDate = this.addTaskForm.get('startDate').value;
      subTask.endDate = this.addTaskForm.get('endDate').value;
      subTask.task = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
      this.taskService.addTask(subTask).subscribe(data => {
        this.resetForm();
        this.error = null;
      }, error => {
        this.error = 'Atleast one of the field has error !!';
        console.log(error)
      });
    }
  }

  onSelect(event) {
    if (event.target.checked) {
      this.addTaskForm.get('priority').disable();
      this.addTaskForm.get('startDate').disable();
      this.addTaskForm.get('endDate').disable();
    } else {
      this.addTaskForm.get('priority').enable();
      this.addTaskForm.get('startDate').enable();
      this.addTaskForm.get('endDate').enable();
    }
  }

  updateTask() {
    let subTask = new Task();

    subTask.parentTaskId = this.selected_parent ? this.selected_parent.split('-')[0].trim() : null;
    subTask.priority = this.addTaskForm.get('priority').value;
    subTask.startDate = this.addTaskForm.get('startDate').value;
    subTask.endDate = this.addTaskForm.get('endDate').value;
    subTask.task = this.titleCasePipe.transform(this.addTaskForm.get('task').value);
    subTask.projectId = this.selected_project.split('-')[0].trim();
    subTask.userId = this.selected_user.split('-')[0].trim()

    this.taskService.editTask(this.task_id, subTask).subscribe(data => {
      this.resetForm();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error)
    })
  }

  cancelEdit() {
    this.router.navigate(['./'])
  }

  clearParent() {
    this.selected_parent = null;
    this.search_parent = null;
    this.addTaskForm.patchValue({
      parentTask: null
    })
  }

}