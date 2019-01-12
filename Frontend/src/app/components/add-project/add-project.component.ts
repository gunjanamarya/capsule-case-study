import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { User } from '../../models/User.model';
import { Project } from '../../models/Project.model';
import { TitleCasePipe } from '@angular/common';
import { FilterProjectPipe } from '../../pipes/filter-project.pipe';
declare var $: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [UserService, ProjectService, TitleCasePipe, FilterProjectPipe]
})

export class AddProjectComponent implements OnInit {

  addProjectForm: FormGroup;
  today: Date;
  tomorrow: Date;
  projects: Project[];
  filteredProjects: Project[];
  users_list: User[];
  search_text: string;
  search_user: string;
  selected_user: string;
  selected_user_id: string;
  editable: boolean;
  edit_id: string;
  error: string;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService,
    private titleCasePipe: TitleCasePipe,
    private filterProjectPipe: FilterProjectPipe) { }

  ngOnInit() {
    this.setDefaultDate();
    this.createForm();
    this.userService.getUsers().subscribe(data => {
      this.users_list = data;
    }, error => {
      console.log(error)
    })
    this.listProjects();
  }

  dateFormatter(date: Date, format: string): any {
    if (!date) { return null; }
    return new DatePipe("en-US").transform(date, format);
  }

  setDefaultDate() {
    let date1 = new Date();
    let date2 = new Date(date1.setDate(date1.getDate() + 1));
    this.today = this.dateFormatter(new Date(), 'yyyy-MM-dd');
    this.tomorrow = this.dateFormatter(date2, 'yyyy-MM-dd');
    if (this.addProjectForm) {
      let start, end;
      start = this.addProjectForm.get('startDate').value;
      end = this.addProjectForm.get('endDate').value;
      if (!start || !end) {
        this.addProjectForm.patchValue({
          "startDate": this.today,
          "endDate": this.tomorrow
        })
      }
    }
  }

  createForm() {
    this.addProjectForm = this.fb.group({
      project: [null, Validators.required],
      priority: [0, Validators.required],
      setDate: false,
      startDate: [{ value: this.today, disabled: true }, [Validators.required]],
      endDate: [{ value: this.tomorrow, disabled: true }, [Validators.required]],
      manager: [{ value: null, disabled: true }, Validators.required]
    }, { validator: this.DateValidator() });
  }

  resetForm() {
    this.addProjectForm.reset({
      priority: 0,
      startDate: { value: this.today, disabled: true },
      endDate: { value: this.tomorrow, disabled: true },
      setDate: false
    });
    this.selected_user = null;
    this.search_user = null;
    this.selected_user_id = null;
  }

  onSelect(event) {
    let status = event.target.checked;
    if (status) {
      this.addProjectForm.get('startDate').enable();
      this.addProjectForm.get('endDate').enable();
    }
    else {
      this.setDefaultDate();
      this.addProjectForm.get('startDate').disable();
      this.addProjectForm.get('endDate').disable();
    }
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

  onAdd() {
    // console.log(this.addProjectForm);
    var project = new Project();
    project.project = this.titleCasePipe.transform(this.addProjectForm.get('project').value);
    project.priority = this.addProjectForm.get('priority').value;
    project.startDate = this.addProjectForm.get('startDate').value;
    project.endDate = this.addProjectForm.get('endDate').value;
    project.userId = this.selected_user_id;
    this.projectService.addProject(project).subscribe(data => {
      this.resetForm();
      this.listProjects();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error)
    })
  }

  saveUser() {
    let temp = this.selected_user.split('-')
    this.selected_user_id = temp[0].trim();
    this.addProjectForm.patchValue({
      "manager": temp[1].trim()
    });
    $('#UserModal').modal('hide');
  }

  listProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      this.projects.forEach(project => {
        this.projectService.getTotalTasks(project._id).subscribe(result => {
          if (result[0]) {
            project['tasks'] = result[0].count;
          }
          else {
            project['tasks'] = 0;
          }
        })
        this.projectService.getCompletedTasks(project._id).subscribe(result => {
          if (result[0]) {
            project['completed'] = result[0].count;
          } else {
            project['completed'] = 0;
          }
        })
      })
      this.filteredProjects = this.projects;
    }, error => {
      console.log(error)
    });

  }

  clearFilter() {
    this.listProjects();
    this.search_text = null;
  }

  sort(basis) {
    if (basis == 'startDate') {
      this.filteredProjects.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    } else if (basis == 'endDate') {
      this.filteredProjects.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    } else if (basis == 'Priority') {
      this.filteredProjects.sort((a, b) => +a.priority - +b.priority)
    } else if (basis == 'Completed') {
      this.filteredProjects.sort((a, b) => +a.completed - +b.completed)
    }
  }

  cancelEdit() {
    this.resetForm();
    this.editable = false;
    this.edit_id = null;
    this.error = null;
  }

  onEdit(id) {
    this.projectService.searchProject(id).subscribe(result => {
      this.getManager(result[0].userId);
      this.addProjectForm.patchValue({
        "project": result[0].project,
        "startDate": this.dateFormatter(new Date(result[0].startDate), 'yyyy-MM-dd'),
        "endDate": this.dateFormatter(new Date(result[0].endDate), 'yyyy-MM-dd'),
        "priority": result[0].priority,
        "setDate": false,
      });
      this.editable = true;
      this.edit_id = id;
    }, error => {
      console.log(error)
    });
  }

  getManager(user_id) {
    this.userService.searchUser(user_id).subscribe(data => {
      this.selected_user = data[0]._id + ' - ' + data[0].firstName + ' ' + data[0].lastName;
      this.addProjectForm.patchValue({
        "manager": this.titleCasePipe.transform(this.selected_user.split('-')[1].trim())
      })
    }, error => {
      console.log(error)
    })
  }

  onEditSave() {
    var project = new Project();
    project.project = this.titleCasePipe.transform(this.addProjectForm.get('project').value);
    project.startDate = this.addProjectForm.get('startDate').value;
    project.endDate = this.addProjectForm.get('endDate').value;
    project.priority = this.addProjectForm.get('priority').value;
    project.userId = this.selected_user.split('-')[0].trim();
    this.projectService.updateProject(project, this.edit_id).subscribe(data => {
      this.editable = false;
      this.edit_id = null;
      this.resetForm();
      this.listProjects();
      this.error = null;
    }, error => {
      this.error = 'Atleast one of the field has error !!';
      console.log(error)
    });
  }

  suspendProject(id) {
    this.projectService.deleteProject(id).subscribe(data => {
      this.listProjects();
    }, error => {
      console.log(error)
    });
  }

  onSearch(text) {
    this.filteredProjects = this.filterProjectPipe.transform(this.projects, text)
  }

}